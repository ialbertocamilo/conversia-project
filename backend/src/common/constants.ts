import { randomBytes } from 'crypto';

export const IV = randomBytes(16);
export const KEY = 4;
export const SALT = 8;

export const jwtConstants = {
  secret: 'secretKey',
};
