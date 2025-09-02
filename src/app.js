
import express from 'express';
import cors from 'cors';

import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Middleware to enable CORS for all origins
app.use(cors());

app.use(express.json());

// Enable parsing URL-encoded bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Base route for convenience and test
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Task Management API' });
});

// Modular route mounting
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Catch-all 404 route handler sends JSON response
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Central error-handling middleware returns JSON error messages
app.use(errorHandler);

export default app;
