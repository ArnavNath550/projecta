import { Router } from 'express';
import { createProject, getProjects, getProjectById, updateProject, deleteProject, getProjectByUserId } from '../controllers/project.controller';

const projectRoutes = Router();

projectRoutes.post('/projects', createProject);
projectRoutes.get('/projects', getProjects);
projectRoutes.get('/projects/:id', getProjectById);
projectRoutes.put('/projects/:id', updateProject);
projectRoutes.delete('/projects/:id', deleteProject);
projectRoutes.get('/projects/user/:id', getProjectByUserId);

export default projectRoutes;
