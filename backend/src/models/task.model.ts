import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'bson';  // Import ObjectId from bson

export interface ITask extends Document {
  taskId: string;  // Add taskId
  projectId: string;
  taskCreator: string;
  taskAssignees?: string[];
  taskName: string;
  taskDescription: string;
  taskPriority: 'low' | 'medium' | 'high';
}

const TaskSchema = new Schema<ITask>({
  taskId: {
    type: String,
    required: true,
    default: () => new ObjectId().toString(),  // Auto-generate a string version of ObjectId
    unique: true,
  },
  projectId: { type: String, required: true },
  taskCreator: { type: String, required: true },
  taskAssignees: { type: [String], default: [] },
  taskName: { type: String, required: true },
  taskDescription: { type: String },
  taskPriority: { type: String, required: true, enum: ['low', 'medium', 'high'] },
}, {
  timestamps: true,  // Automatically handle createdAt and updatedAt fields
});

const Task = model<ITask>('Task', TaskSchema);
export default Task;
