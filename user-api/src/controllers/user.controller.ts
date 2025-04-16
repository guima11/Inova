import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AppError } from '../types';

export class UserController {
    private service = new UserService();

    async getAllUsers(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const result = await this.service.getAllUsers(page, limit);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const user = await this.service.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro ao buscar usuário' });
            }
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const { name, email, age, password } = req.body;
            if (!name || !email || !password) {
                throw new AppError('Nome, email e senha são obrigatórios', 400);
            }

            const user = await this.service.createUser({ name, email, age, password });
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro ao criar usuário' });
            }
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const user = await this.service.updateUser(
                req.params.id, // Remove parseInt
                req.body
            );
            res.json(user);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro ao atualizar usuário' });
            }
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const user = await this.service.deleteUser(parseInt(req.params.id));
            res.json(user);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro ao deletar usuário' });
            }
        }
    }

}