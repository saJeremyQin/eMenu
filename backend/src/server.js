import express from "express";
import cors from 'cors';
import authenticateUser from "./authMiddleware";
import userRoutes from './routes/userRoutes';
import dishtypeRoutes from './routes/dishtypeRoutes';

const app = express();

// set CORS
app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'https://emenu-el2v.onrender.com');
    res.setHeader('Access-Control-Allow-Origin','https://vigilant-palm-tree-577qwrxjwrgcvjjw-8080.preview.app.github.dev/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
 });
 

app.use(cors());
app.use(express.json());
app.use(authenticateUser);

app.use('/api/users', userRoutes); // Mounting user routes
app.use('/api/dishtypes', dishtypeRoutes);

app.listen('8000', () => {
    console.log("Server is listening on Port 8000");
})