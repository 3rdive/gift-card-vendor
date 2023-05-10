import { Request, Response, NextFunction } from 'express';
import {UnAuthenticatedError } from '../ErrorUtils';
import { isTokenValid } from '../Middleware/jwt.file';
import Token from '../../Models/token.model';
import { attachCookiesToResponse } from '../Middleware/jwt.file';
import { AuthenticatedUser } from '../../Interfaces/req.user';
import { Payload } from '../../Interfaces/jwt.dao';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken) as Payload;
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken) as Payload;

    const existingToken = await Token.query()
      .findOne({
        userId: payload.user.id,
        refreshToken: payload.refresh_token,
      })
      .throwIfNotFound();

    if (!existingToken || !existingToken?.isValid) {
      throw new UnAuthenticatedError('Authentication Invalid');
    }

    attachCookiesToResponse({
        res,
        user: payload.user,
        refresh_token: existingToken.refresh_token,
      });
  
      req.user = payload.user
      next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};
