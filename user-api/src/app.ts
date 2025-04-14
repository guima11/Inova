import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './utils/errorHandler';
import prisma from './config/prisma';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('User API is running with Prisma');
});

app.use(errorHandler);

export { app, prisma };