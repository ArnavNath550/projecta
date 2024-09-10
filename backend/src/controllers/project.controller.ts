import { Request, Response } from 'express';
import Project from '../models/project.model';

// Create a new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId, projectName, projectDescription, projectIcon, projectCreator } = req.body;
        const newProject = new Project({
            projectId,
            projectName,
            projectDescription,
            projectIcon,
            projectCreator
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};

// Get all projects
export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

// Get a project by ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const project = await Project.findOne({ projectId: id });

        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project', error });
    }
};

// Update a project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const project = await Project.findOneAndUpdate({ projectId: id }, updatedData, { new: true });

        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const project = await Project.findOneAndDelete({ projectId: id });

        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
};
