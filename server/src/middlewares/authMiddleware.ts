import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { sendError } from '../utils/response';
import { AuthenticatedRequest, UserPayload } from '../types';

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    sendError(res, 'UNAUTHORIZED', 'Not authorized to access this resource. Token missing.', 401);
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    sendError(res, 'UNAUTHORIZED', 'Not authorized to access this resource. Token invalid or expired.', 401);
  }
};

export const adminOnly = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  if (!req.user) {
    sendError(res, 'UNAUTHORIZED', 'Not authorized.', 401);
    return;
  }

  if (req.user.role !== 'admin') {
    sendError(res, 'FORBIDDEN', 'Access denied. Administrator privileges required.', 403);
    return;
  }

  next();
};
