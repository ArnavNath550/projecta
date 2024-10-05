import { Request, Response } from 'express';
import { supabase } from '../config/db';

// Create a new tag
export const createTag = async (req: Request, res: Response) => {
  const { tag_name, tag_colour, tag_id, tag_creator, project_id } = req.body;
  
  const { data, error } = await supabase
    .from('tags')
    .insert([{ tag_name, tag_colour, tag_id, tag_creator, project_id }]);

  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json({ data });
};

// Get all tags
export const getTags = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('tags').select('*');
  
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ data });
};

// Get tag by ID
export const getTagById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error: 'Tag not found' });
  return res.status(200).json({ data });
};

// Update a tag
export const updateTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tag_name, tag_colour, tag_id, tag_creator, project_id } = req.body;

  const { data, error } = await supabase
    .from('tags')
    .update({ tag_name, tag_colour, tag_id, tag_creator, project_id })
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  return res.status(200).json({ data });
};

// Delete a tag
export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase.from('tags').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ message: 'Tag deleted successfully' });
};

// Get tags by project ID
export const getTagsByProjectId = async (req: Request, res: Response) => {
  const { project_id } = req.params;

  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('project_id', project_id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ data });
};
