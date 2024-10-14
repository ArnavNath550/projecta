// src/routes/issueRoutes.ts
import express from 'express';
import {
  createIssue,
  getIssues,
  updateIssue,
  deleteIssue,
  getIssueByProjectId,
  getIssueById,
  filterIssuesByStatus,
} from '../controllers/issues.controller';

const issueRouter = express.Router();

issueRouter.post('/issues', createIssue);
issueRouter.get('/issues', getIssues);
issueRouter.get('/issues/:id', getIssueById);
issueRouter.get('/issues/project/:id', getIssueByProjectId);
issueRouter.get('/issues/project/:id/filter', filterIssuesByStatus);
issueRouter.put('/issues/:id', updateIssue);
issueRouter.delete('/issues/:id', deleteIssue);

export default issueRouter;
