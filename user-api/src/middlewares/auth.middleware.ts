import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';
import { AppError } from '../types';
import prisma from '../config/prisma';

// Extendendo a interface Request do Express
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;  // ObjectId como string
                email: string;
            };
        }
    }
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // 1. Verificar se o token existe no header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError('Token não fornecido', 401);
        }

        // 2. Extrair o token do header (Formato: Bearer <token>)
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new AppError('Formato de token inválido', 401);
        }

        // 3. Verificar e decodificar o token JWT
        const decoded = verifyToken(token) as { id: string; email: string };

        // 4. Verificar se o usuário ainda existe no banco (opcional)
        const userExists = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true }
        });

        if (!userExists) {
            throw new AppError('Usuário não encontrado', 401);
        }

        // 5. Adicionar o usuário decodificado à requisição
        req.user = decoded;

        // 6. Continuar para a próxima middleware/controller
        next();
    } catch (error) {
        // Tratamento de erros específicos do JWT
        if (error instanceof Error && error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Token inválido' });
        }

        if (error instanceof Error && error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expirado' });
        }

        // Outros erros
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        // Erro genérico
        console.error('Erro no middleware de autenticação:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};