import { Request, Response } from 'express';
import { supabase } from '../config/db';

export const createIssue = async (req: Request, res: Response) => {
  const {
    issue_name,
    issue_description,
    issue_status,
    issue_priority,
    issue_tags,
    issue_identifier,
    issue_id,
    project_creator,
    project_id,
  } = req.body;

  const { data, error } = await supabase
    .from('issues')
    .insert([
      {
        issue_name,
        issue_description,
        issue_status,
        issue_priority,
        issue_tags,
        issue_identifier,
        issue_id,
        project_creator,
        project_id,
      },
    ]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(201).json({ data });
};

export const getIssues = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('issues').select('*');
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(200).json(data);
};

export const getIssueByProjectId = async (req: Request, res: Response) => {
  const { id } = req.params; // Extract project_id from URL params

  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .eq('project_id', id); // Filter based on project_id

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ message: 'No issues found for this project' });
  }

  res.status(200).json(data);
};


export const updateIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    issue_name,
    issue_description,
    issue_status,
    issue_priority,
    issue_tags,
    issue_identifier,
    issue_id,
    project_creator,
    project_id,
  } = req.body;

  const { data, error } = await supabase
    .from('issues')
    .update({
      issue_name,
      issue_description,
      issue_status,
      issue_priority,
      issue_tags,
      issue_identifier,
      issue_id,
      project_creator,
      project_id,
    })
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(200).json({ data });
};

export const deleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase.from('issues').delete().eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(204).send();
};

