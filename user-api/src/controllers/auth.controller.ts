import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../types';

export class AuthController {
    private service = new AuthService();

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new AppError('Email and password are required', 400);
            }

            const result = await this.service.login(email, password);
            res.json(result);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}