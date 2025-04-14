import { UserRepository } from '../repositories/user.repository';
import { generateToken } from '../config/jwt';
import bcrypt from 'bcryptjs';
import { AppError } from '../types';

export class AuthService {
    private repository = new UserRepository();

    async login(email: string, password: string) {
        const user = await this.repository.findByEmail(email);
        if (!user) throw new AppError('Invalid credentials', 401);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new AppError('Invalid credentials', 401);

        const token = generateToken({ id: user.id, email: user.email });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                age: user.age,
                createdAt: user.createdAt
            },
            token
        };
    }
}