import express from 'express';
import { createOrUpdateWorkflow, getWorkflowByProjectId } from '../controllers/workflows.controller';

const workflowRouter = express.Router();

// Route to create or update a workflow
workflowRouter.post('/workflows', createOrUpdateWorkflow);

// Route to get workflow by project_id
workflowRouter.get('/workflows/:project_id', getWorkflowByProjectId);

export default workflowRouter;
