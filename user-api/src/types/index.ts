export class AppError extends Error {
    constructor(public message: string, public statusCode: number = 400) {
        super(message);
        this.name = 'AppError';
    }
}

export interface JwtPayload {
    id: number;
    email: string;
}