import { Request, Response } from 'express';
import { supabase } from '../config/db';

// Create a new project and starter issues
export const createProject = async (req: Request, res: Response) => {
  const { project_name, project_icon, project_identifer, project_creator, project_id } = req.body;

  try {
    // Insert the new project into the 'projects' table
    const { data: projectData, error: projectError } = await supabase
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

    if (projectError) throw projectError;

    // Generate starter issues
    // const starterIssues = [
    //   { issue_name: 'Welcome to Project.A', issue_status: 'Todo', issue_description: 'Start by exploring your new project.', issue_priority: 'Low' },
    //   { issue_name: 'Set up your first task', issue_status: 'In Progress', issue_description: 'Create a task and assign it to yourself.', issue_priority: 'Medium' },
    //   { issue_name: 'Review project settings', issue_status: 'In Review', issue_description: 'Review and adjust project settings to suit your needs.', issue_priority: 'Medium' },
    //   { issue_name: 'Complete onboarding', issue_status: 'Done', issue_description: 'Finish the onboarding steps for Project.A.', issue_priority: 'High' },
    //   { issue_name: 'Start building features', issue_status: 'Todo', issue_description: 'Begin by planning the features you want to add.', issue_priority: 'High' },
    // ];

    // // Map the issues with the project ID
    // const issuesToInsert = starterIssues.map(issue => ({
    //   ...issue,
    //   issue_identifier: `${project_id}-${issue.issue_name.replace(/\s+/g, '_').toLowerCase()}`, // Generate unique identifier
    //   issue_tags: ['onboarding', 'welcome'],
    //   project_creator,
    //   project_id,
    // }));

    // // Insert the starter issues into the 'issues' table
    // const { error: issueError } = await supabase.from('issues').insert(issuesToInsert);
    // if (issueError) throw issueError;

    // Create the default workflow for the project
    const defaultWorkflow = [
      { workflowName: 'TODO', workflowLabel: 'Todo', workflowGroup: 'TODO' },
      { workflowName: 'PENDING', workflowLabel: 'Pending', workflowGroup: 'TODO' },
      { workflowName: 'IN_REVIEW', workflowLabel: 'In Review', workflowGroup: 'IN_REVIEW' },
      { workflowName: 'DONE', workflowLabel: 'Done', workflowGroup: 'DONE' },
    ];

    // Insert the default workflow into the 'workflows' table
    const workflowsToInsert = {
      workflow_data: defaultWorkflow,
      project_id: project_id,
      created_at: new Date(),
    };

    const { error: workflowError } = await supabase.from('workflows').insert(workflowsToInsert);
    if (workflowError) throw workflowError;

    return res.status(201).json({
      message: 'Project created successfully with starter issues and default workflow',
      project: projectData,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating project, issues, or workflow', error });
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
