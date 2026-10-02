// ═══════════════════════════════════════════
// ANATHEA — Auth Utilities (JWT & Bcrypt)
// ═══════════════════════════════════════════

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 12;

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: TokenPayload): string {
  const secret = process.env.JWT_SECRET || 'anathea-dev-secret-key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, secret, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });
}

export function verifyToken(token: string): TokenPayload {
  const secret = process.env.JWT_SECRET || 'anathea-dev-secret-key';
  return jwt.verify(token, secret) as TokenPayload;
}
