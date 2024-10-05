import express from 'express';
import { 
  createTag, 
  getTags, 
  getTagById, 
  updateTag, 
  deleteTag, 
  getTagsByProjectId 
} from '../controllers/tags.controller';

const tagRouter = express.Router();

// POST /tags - Create a new tag
tagRouter.post('/tags', createTag);

// GET /tags - Get all tags
tagRouter.get('/tags', getTags);

// GET /tags/:id - Get a specific tag by ID
tagRouter.get('/tags/:id', getTagById);

// PUT /tags/:id - Update a specific tag by ID
tagRouter.put('/tags/:id', updateTag);

// DELETE /tags/:id - Delete a specific tag by ID
tagRouter.delete('/tags/:id', deleteTag);

// GET /tags/project/:project_id - Get tags by project ID
tagRouter.get('/tags/project/:project_id', getTagsByProjectId);

export default tagRouter;
