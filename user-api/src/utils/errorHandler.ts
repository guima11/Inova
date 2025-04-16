import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
}