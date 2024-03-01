import express from "express";
import cors from 'cors';
import authenticateUser from "./authMiddleware";
import userRoutes from './routes/userRoutes';
import dishtypeRoutes from './routes/dishtypeRoutes';

const app = express();

const corsOptions = {
    origin: ['https://emenu-el2v.onrender.com', 'https://vigilant-palm-tree-577qwrxjwrgcvjjw-8080.preview.app.github.dev/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(authenticateUser);

app.use('/api/users', userRoutes); // Mounting user routes
app.use('/api/dishtypes', dishtypeRoutes);

app.listen('8000', () => {
    console.log("Server is listening on Port 8000");
})