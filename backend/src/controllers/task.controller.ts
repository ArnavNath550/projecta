import { Request, Response } from 'express';
import Task from '../models/task.model';  // Assuming Task model is in models/task

// Create Task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { projectId, taskCreator, taskAssignees, taskName, taskDescription, taskPriority } = req.body;

    // Create a new task
    const newTask = new Task({
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
    return res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// Update Task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const updateData = req.body;

    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Delete Task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting task', error: error.message });
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
    return res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
  }
};
