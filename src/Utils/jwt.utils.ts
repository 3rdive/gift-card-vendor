import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnAuthenticatedError } from "../Utils/ErrorUtils";
import { IToken } from "../Interfaces/token.interface";

export const verifyAccessToken = (secret: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      throw new UnAuthenticatedError("Access token not found");
    }

    try {
      const decodedToken = jwt.verify(accessToken, secret) as IToken;

      req.user = {
        id: decodedToken.userId,
        email: decodedToken.email,
      };

      return next();
    } catch (error) {
      throw new UnAuthenticatedError("Invalid access token");
    }
  };
};
