import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../jwt.utils";
import { UnAuthenticatedError } from "../ErrorUtils";

export const authenticateLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnAuthenticatedError("Authorization header missing");
    }

    const accessToken = authHeader.split(" ")[1];
    const  userId  = await verifyAccessToken(accessToken);

    req.body.userId = userId;

    next();
  } catch (error) {
    next(error);
  }
};