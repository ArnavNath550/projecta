import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectsByUserId,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';

const projectRouter = express.Router();

// Create a project
projectRouter.post('/projects', createProject);

// Get all projects
projectRouter.get('/projects', getAllProjects);

// Get project by ID
projectRouter.get('/projects/:id', getProjectById);

// Get projects by user ID
projectRouter.get('/projects/user/:userId', getProjectsByUserId);

// Update a project
projectRouter.put('/projects/:id', updateProject);

// Delete a project
projectRouter.delete('/projects/:id', deleteProject);

export default projectRouter;
