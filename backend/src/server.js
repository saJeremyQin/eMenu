import express from "express";
import cors from 'cors';
import authenticateUser from "./authMiddleWare";
import userRoutes from './routes/userRoutes';
import dishtypeRoutes from './routes/dishtypeRoutes';


const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateUser);

app.use('/api/users', userRoutes); // Mounting user routes
app.use('/api/dishtypes', dishtypeRoutes);

app.listen('8000', () => {
    console.log("Server is listening on Port 8000");
})