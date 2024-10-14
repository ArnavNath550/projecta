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
    issue_due_date,
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
        issue_due_date,
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
    .eq('project_id', id).order('id', {ascending: false}); // Filter based on project_id

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ message: 'No issues found for this project' });
  }

  res.status(200).json(data);
};

export const getIssueById = async (req: Request, res: Response) => {
  const { id } = req.params; // Extract issue_id from URL params

  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .eq('issue_id', id); // Filter based on issue_id

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'Issue not found' });
  }

  res.status(200).json(data[0]); // Return the specific issue
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
    .eq('issue_id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(200).json({ data });
};

export const deleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase.from('issues').delete().eq('issue_id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(204).send();
};


export const filterIssuesByStatus = async (req: Request, res: Response) => {
  const { id } = req.params; // Extract project_id from URL params
  const { issue_status } = req.query; // Extract issue_status from query params

  // Ensure that the issue_status is provided
  if (!issue_status) {
    return res.status(400).json({ message: 'issue_status query parameter is required' });
  }

  // Query to filter issues by project_id and issue_status
  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .eq('project_id', id)
    .eq('issue_status', issue_status) // Filter by issue_status
    .order('id', { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ message: 'No issues found with the specified status for this project' });
  }

  res.status(200).json(data);
};
