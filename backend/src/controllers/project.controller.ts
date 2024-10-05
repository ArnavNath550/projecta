import { Request, Response } from 'express';
import { supabase } from '../config/db';

// Create a new project
export const createProject = async (req: Request, res: Response) => {
  const { project_name, project_icon, project_identifer, project_creator, project_id } = req.body;

  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          project_name,
          project_icon,
          project_identifer,
          project_creator,
          project_id,
          created_at: new Date(),
        },
      ]);

    if (error) throw error;

    return res.status(201).json({ message: 'Project created successfully', project: data });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating project', error });
  }
};

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) throw error;

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase.from('projects').select('*').eq('project_id', id);
    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching project', error });
  }
};

// Get projects by user ID
export const getProjectsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase.from('projects').select('*').eq('project_creator', userId);
    if (error) throw error;

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// Update a project
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { project_name, project_icon, project_identifer } = req.body;

  try {
    const { data, error } = await supabase
      .from('projects')
      .update({
        project_name,
        project_icon,
        project_identifer,
      })
      .eq('id', id);

    if (error) throw error;

    return res.status(200).json({ message: 'Project updated successfully', project: data });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating project', error });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting project', error });
  }
};
