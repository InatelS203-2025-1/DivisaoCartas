import { Response } from 'express';

export function requestHelper<T>(res: Response, statusCode: number, data: T): void {
  res.status(statusCode).json(data);
}
