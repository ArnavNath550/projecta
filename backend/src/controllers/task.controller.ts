import { Request, Response } from 'express';
import Task from '../models/task.model';
import { ObjectId } from 'bson';  // Import ObjectId from bson

// Helper function to extract error message safely
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

// Create Task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { projectId, taskCreator, taskAssignees, taskName, taskDescription, taskPriority } = req.body;
    
    // Generate taskId using ObjectId from bson
    const taskId = new ObjectId().toString();

    // Create a new task
    const newTask = new Task({
      taskId,
      projectId,
      taskCreator,
      taskAssignees,
      taskName,
      taskDescription,
      taskPriority,
    });

    const savedTask = await newTask.save();
    return res.status(201).json({ message: 'Task created successfully', task: savedTask });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating task', error: getErrorMessage(error) });
  }
};

// Update Task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const updateData = req.body;

    // Find the task by taskId and update it
    const updatedTask = await Task.findOneAndUpdate({ taskId }, updateData, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task', error: getErrorMessage(error) });
  }
};

// Delete Task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    // Find the task by taskId and delete it
    const deletedTask = await Task.findOneAndDelete({ taskId });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting task', error: getErrorMessage(error) });
  }
};

// Get Tasks by Project ID
export const getTasksByProjectId = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    // Find tasks by projectId
    const tasks = await Task.find({ projectId });

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this project' });
    }

    return res.status(200).json({ message: 'Tasks retrieved successfully', tasks });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving tasks', error: getErrorMessage(error) });
  }
};
