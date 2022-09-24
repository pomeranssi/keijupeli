import { z } from 'zod';

import { Timestamp } from 'shared/time/time';

import { ObjectId, UUID } from './primitives';

export const Password = z.string().trim().min(8);
export const Username = z.string().trim().min(4);

export const User = z.object({
  id: ObjectId,
  username: Username,
  admin: z.boolean(),
});
export type User = z.infer<typeof User>;

export const Session = z.object({
  id: UUID,
  userId: ObjectId,
  loginTime: Timestamp,
  expiryTime: Timestamp,
  refreshToken: UUID,
  refreshTokenExpiry: Timestamp,
});
export type Session = z.infer<typeof Session>;

export const LoginData = z.object({
  username: Username,
  /** Password as plain text */
  password: Password,
});
export type LoginData = z.infer<typeof LoginData>;

export const SessionInfo = z.object({
  user: User,
  session: Session,
});
export type SessionInfo = z.infer<typeof SessionInfo>;
