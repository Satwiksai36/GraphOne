import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('💥 Unhandled Exception:', err);

  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred on the server.';

  sendError(res, errorCode, message, statusCode);
};
