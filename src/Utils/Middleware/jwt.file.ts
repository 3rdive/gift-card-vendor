import jwt, { Secret } from 'jsonwebtoken';

import { CreateJWTPayload, Payload } from '../../Interfaces/jwt.dao';
import { CreateJWT } from '../../Interfaces/jwt.dao';
import { AttachCookiesToResponse } from '../../Interfaces/jwt.dao';

const createJWT = ({ payload }: { payload: CreateJWTPayload }): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as Secret);
  return token;
};

const isTokenValid = (token: string): Payload => jwt.verify(token, process.env.JWT_SECRET as Secret) as Payload;



const attachCookiesToResponse = ({ res, user, refresh_token }: AttachCookiesToResponse): void => {
  const accessTokenJWT = createJWT({ payload: { id: user.id, user_name: user.user_name } });
  const refreshTokenJWT = createJWT({ payload: { id: user.id, user_name: user.user_name, refresh_token } });

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + longerExp),
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
