import { Request, Response } from 'express';
import User from '../models/user.model';

export const loginOrSignup = async (req: Request, res: Response) => {
  const { userId, email, firstName, lastName, profilePic } = req.body;

  try {
    // Check if the user already exists by either email or userId
    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });

    if (existingUser) {
      // User exists, log them in
      return res.status(200).json({ message: 'Login successful', userData: existingUser });
    } else {
      // User does not exist, create a new user
      const newUser = new User({
        userId,
        email, // Ensure email is saved
        firstName,
        lastName,
        profilePic,
      });

      await newUser.save();
      return res.status(201).json({ message: 'Signup successful', userData: newUser });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
