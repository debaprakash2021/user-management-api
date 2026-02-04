import express from 'express';
import userRoutes from './routes/routes.user.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API!"
    });
});

app.use('/api/users', userRoutes);

export default app;