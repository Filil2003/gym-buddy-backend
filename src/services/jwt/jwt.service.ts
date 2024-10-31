import jwt, { type JwtPayload } from 'jsonwebtoken';
import { config } from '#config/index.js';

const { secretKey, expiresIn } = config.jwt;

export const jwtService = {
  signToken,
  verifyToken
};

function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, secretKey, { expiresIn });
}

function verifyToken<T>(token: string): T {
  return jwt.verify(token, secretKey) as T;
}
