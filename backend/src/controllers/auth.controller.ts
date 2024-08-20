import { Request, Response } from 'express';
import User from '../models/user.model';

export const loginOrSignup = async (req: Request, res: Response) => {
  const { userId, firstName, lastName, profilePic } = req.body;

  try {
    // Check if the userDataalready exists
    let userData= await User.findOne({ userId });

    if (userData) {
      // User exists, log them in
      return res.status(200).json({ message: 'Login successful', userData});
    } else {
      // User does not exist, create a new user
      userData= new User({
        userId,
        firstName,
        lastName,
        profilePic,
      });

      await userData.save();
      return res.status(201).json({ message: 'Signup successful', userData});
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
