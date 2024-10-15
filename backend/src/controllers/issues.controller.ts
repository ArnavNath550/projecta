//@ts-nocheck
import { Request, Response } from 'express';
import { supabase } from '../config/db';
import {getProjectIdentifier} from './helpers';


// Helper function to get the project identifier (e.g., 'PROJECT-')
const handleGetProjectIdentifier = async (project_id: string): Promise<string> => {
  // Assuming you have a way to get the project identifier (e.g., project name or key)
  // This could be fetched from a 'projects' table using `project_id`
  const { data, error } = await supabase
    .from('projects')
    .select('project_name') // Assuming 'project_key' is something like 'PROJECT'
    .eq('project_id', project_id)
    .single();

  if (error) {
    throw new Error('Error fetching project identifier');
  }

  return getProjectIdentifier(data.project_name); // Returns something like 'PROJECT'
};

export const createIssue = async (req: Request, res: Response) => {
  const {
    issue_name,
    issue_description,
    issue_status,
    issue_priority,
    issue_tags,
    issue_due_date,
    issue_identifier,
    issue_id,
    project_creator,
    project_id,
  } = req.body;

  try {
    // Fetch the project identifier (e.g., 'PROJECT')
    const projectIdentifier = await handleGetProjectIdentifier(project_id);

    // Get the current number of issues for this project to auto-increment the issue number
    const { count: issueCount, error: countError } = await supabase
      .from('issues')
      .select('*', { count: 'exact' }) // Count all issues for this project
      .eq('project_id', project_id);

    if (countError) {
      return res.status(400).json({ error: 'Error counting project issues' });
    }

    // Generate the issue_identifier by appending the next issue number to the project identifier
    const nextIssueNumber = issueCount + 1;
    const issue_identifier = `${projectIdentifier}-${nextIssueNumber}`;

    // Insert the new issue with the auto-generated issue_identifier
    const { data, error } = await supabase
      .from('issues')
      .insert([
        {
          issue_name,
          issue_description,
          issue_status,
          issue_priority,
          issue_tags,
          issue_due_date,
          issue_identifier, // Use the newly generated identifier
          issue_id,
          project_creator,
          project_id,
        },
      ]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ data });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating issue', details: error.message });
  }
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
  const { id } = req.params; // This is the issue_id from the URL
  const {
    issue_name,
    issue_description,
    issue_status,
    issue_priority,
    issue_tags,
    issue_identifier,
    project_creator,
    project_id,
  } = req.body;

  // Make sure you are handling the correct issue_id, and using the right fields
  try {
    const { data, error } = await supabase
      .from('issues')
      .update({
        issue_name,
        issue_description,
        issue_status,
        issue_priority,
        issue_tags,
        project_creator,
        project_id,
      })
      .eq('issue_id', id); // Ensure id from params matches the column 'issue_id'

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: 'Server error updating issue', details: err });
  }
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
