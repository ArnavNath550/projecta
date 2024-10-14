import { Request, Response } from 'express';
import { supabase } from '../config/db';

export const createOrUpdateWorkflow = async (req: Request, res: Response) => {
  const { project_id, workflow_data } = req.body;

  if (!project_id || !workflow_data) {
    return res.status(400).json({ error: 'project_id and workflow_data are required' });
  }

  try {
    // Check if a workflow already exists for this project
    const { data: existingWorkflow, error: fetchError } = await supabase
      .from('workflows')
      .select('*')
      .eq('project_id', project_id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // If there's a different error (excluding 'PGRST116' which is the "no rows" error)
      return res.status(500).json({ error: 'Error fetching workflow', details: fetchError });
    }

    if (existingWorkflow) {
      // Update the existing workflow
      const { data, error } = await supabase
        .from('workflows')
        .update({ workflow_data, created_at: new Date() })
        .eq('project_id', project_id);

      if (error) {
        return res.status(500).json({ error: 'Error updating workflow', details: error });
      }
      
      return res.status(200).json({ message: 'Workflow updated successfully', data });
    } else {
      // Insert a new workflow
      const { data, error } = await supabase
        .from('workflows')
        .insert([{ project_id, workflow_data, created_at: new Date() }]);

      if (error) {
        return res.status(500).json({ error: 'Error creating workflow', details: error });
      }

      return res.status(201).json({ message: 'Workflow created successfully', data });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', details: err });
  }
};

export const getWorkflowByProjectId = async (req: Request, res: Response) => {
  const { project_id } = req.params;

  if (!project_id) {
    return res.status(400).json({ error: 'project_id is required' });
  }

  try {
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .eq('project_id', project_id)
      .single();

    if (error) {
      return res.status(500).json({ error: 'Error fetching workflow', details: error });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', details: err });
  }
};
