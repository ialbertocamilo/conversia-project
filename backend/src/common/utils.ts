import * as bcrypt from 'bcrypt';
import { SALT } from './constants';

export async function encrypt(value: string) {
  return await bcrypt.hash(value, SALT);
}

export async function decrypt(value: string, encryptedHash: string) {
  return await bcrypt.compare(value, encryptedHash);
}
