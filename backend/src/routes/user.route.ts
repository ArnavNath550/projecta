import { Router } from 'express';
import { createUser, getUserById, getAllUsers, updateUser, deleteUser } from '../controllers/user.controller';  // Adjust the path as needed

const userRoutes = Router();

// Route to create a new user
userRoutes.post('/users', createUser);

// Route to get a user by userId
userRoutes.get('/users/:userId', getUserById);

// Route to get all users
userRoutes.get('/users', getAllUsers);

// Route to update a user by userId
userRoutes.put('/users/:userId', updateUser);

// Route to delete a user by userId
userRoutes.delete('/users/:userId', deleteUser);

export default userRoutes;
