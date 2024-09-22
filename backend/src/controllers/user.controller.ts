import { Request, Response } from 'express';
import User from '../models/user.model';  // Adjust the path as needed

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, firstName, lastName, profilePic } = req.body;
    const newUser = new User({
      userId,
      firstName,
      lastName,
      profilePic,
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get a user by userId
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Get all users
export const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, profilePic } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { firstName, lastName, profilePic },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findOneAndDelete({ userId });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error });
  }
};
