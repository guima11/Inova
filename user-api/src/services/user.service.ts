import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../types';
import {User} from "../models/user.model";

export class UserService {
    private repository = new UserRepository();

    async getAllUsers(page: number = 1, limit: number = 10) {
        const [users, total] = await Promise.all([
            this.repository.findAll(page, limit),
            this.repository.count(),
        ]);
        return {
            data: users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }


    async getUserById(id: string) {
        const user = await this.repository.findById(id);
        if (!user) throw new AppError('User not found', 404);
        return user;
    }

    async createUser(userData: Omit<User, 'id'>) {
        const existingUser = await this.repository.findByEmail(userData.email);
        if (existingUser) throw new AppError('Email já cadastrado', 400);

        return this.repository.create(userData);
    }

    async updateUser(id: string, userData: Partial<User>) {
        await this.getUserById(id); // Valida existência do usuário

        if (userData.email) {
            const existingUser = await this.repository.findByEmail(userData.email);
            if (existingUser && existingUser.id !== id) {
                throw new AppError('Email já está em uso por outro usuário', 400);
            }
        }

        return this.repository.update(id, userData);
    }

    async deleteUser(id: string) {
        const user = await this.getUserById(id);
        await this.repository.delete(id);
        return user;
    }
}