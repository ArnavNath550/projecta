import { Schema, model, Document } from 'mongoose';

// Task Interface for TypeScript
interface ITask extends Document {
  projectId: string;                 // Reference to the project
  taskCreator: string;               // The user who created the task
  taskAssignees?: string[];          // Optional array of user IDs assigned to the task
  taskName: string;                  // Task name
  taskDescription: string;           // Task description
  taskPriority: 'low' | 'medium' | 'high';  // Task priority (can be 'low', 'medium', or 'high')
}

// Task Schema Definition
const taskSchema = new Schema<ITask>({
  projectId: { type: String, required: true },       // Required field for project reference
  taskCreator: { type: String, required: true },     // Required field for creator
  taskName: { type: String, required: true },        // Required task name
  taskDescription: { type: String },                 // Optional description
  taskAssignees: { type: [String], default: [] },    // Optional field for task assignees
  taskPriority: {                                    // Priority field with enum validation
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  }
}, { timestamps: true });  // Add createdAt and updatedAt fields

// Export the Task model
const Task = model<ITask>('Task', taskSchema);

export default Task;
