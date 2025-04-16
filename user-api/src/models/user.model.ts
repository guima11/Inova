export interface User {
    id?: string;  // Alterado para string (ObjectId)
    name: string;
    email: string;
    age?: number;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}