import express from 'express';
import { createTask, updateTask, deleteTask, getTasksByProjectId } from '../controllers/task.controller';

const taskRoutes = express.Router();

taskRoutes.post('/tasks', createTask);  // Create task
taskRoutes.put('/tasks/:taskId', updateTask);  // Update task
taskRoutes.delete('/tasks/:taskId', deleteTask);  // Delete task
taskRoutes.get('/tasks/project/:projectId', getTasksByProjectId);  // Get tasks by project ID

export default taskRoutes;
