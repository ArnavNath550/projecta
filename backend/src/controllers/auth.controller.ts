import { Request, Response } from 'express';
import User from '../models/user.model';

export const loginOrSignup = async (req: Request, res: Response) => {
  const { userId, firstName, lastName, profilePic } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ userId });

    if (user) {
      // User exists, log them in
      return res.status(200).json({ message: 'Login successful', user });
    } else {
      // User does not exist, create a new user
      user = new User({
        userId,
        firstName,
        lastName,
        profilePic,
      });

      await user.save();
      return res.status(201).json({ message: 'Signup successful', user });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
