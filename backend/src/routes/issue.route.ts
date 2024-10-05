// src/routes/issueRoutes.ts
import express from 'express';
import {
  createIssue,
  getIssues,
  updateIssue,
  deleteIssue,
  getIssueByProjectId,
} from '../controllers/issues.controller';

const issueRouter = express.Router();

issueRouter.post('/issues', createIssue);
issueRouter.get('/issues', getIssues);
issueRouter.get('/issues/project/:id', getIssueByProjectId);
issueRouter.put('/issues/:id', updateIssue);
issueRouter.delete('/issues/:id', deleteIssue);

export default issueRouter;
