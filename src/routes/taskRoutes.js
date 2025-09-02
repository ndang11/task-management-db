import express from 'express';
import { getTasks, createTask } from '../controllers/taskController.js';
import authRoutes from '../routes/authRoutes.js'

const router = express.Router();

router.use(authRoutes);

router.get('/', getTasks);
router.post('/', createTask);

export default router;
