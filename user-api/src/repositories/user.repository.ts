import prisma from '../config/prisma';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';

export class UserRepository {
    async findAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        return prisma.user.findMany({
            skip,
            take: limit,
            select: {
                id: true,
                name: true,
                email: true,
                age: true,
                createdAt: true
            }
        });
    }

    async findById(id: string) {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    async create(userData: Omit<User, 'id'>) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });
    }

    async update(id: string, userData: Partial<User>) {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return prisma.user.update({
            where: { id },
            data: userData,
        });
    }

    async delete(id: string) {
        return prisma.user.delete({
            where: { id },
        });
    }

    async count() {
        return prisma.user.count();
    }
}