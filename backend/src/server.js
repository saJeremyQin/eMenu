import express from "express";
import cors from 'cors';
import path from 'path';
import authenticateUser from "./authMiddleware";
import userRoutes from './routes/userRoutes';
import dishtypeRoutes from './routes/dishtypeRoutes';

const app = express();

// set CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://vigilant-palm-tree-577qwrxjwrgcvjjw-3000.preview.app.github.dev');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
});

// use CORS
app.use(cors());
app.use(express.static(path.resolve(__dirname,"../dist"),{ maxAge:"1y", etag:false}));

app.use(express.json());
app.use(authenticateUser);

app.use('/api/users', userRoutes); // Mounting user routes
app.use('/api/dishtypes', dishtypeRoutes);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../dist/index.html"));
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is listening on Port " + port);
})