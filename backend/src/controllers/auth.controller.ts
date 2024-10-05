import { Request, Response } from 'express';
import { supabase } from '../config/db';


export const loginOrSignup = async (req: Request, res: Response) => {
  const { userId, firstName, lastName, profilePic } = req.body;

  try {
    // Check if the user already exists by userId
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // If there was an error other than "row not found", handle it
      return res.status(500).json({ message: 'Error fetching user', error: fetchError });
    }

    if (existingUser) {
      // User exists, log them in
      return res.status(200).json({ message: 'Login successful', userData: existingUser });
    } else {
      // User does not exist, create a new user
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            profile_pic: profilePic,
          },
        ])
        .single();

      if (insertError) {
        return res.status(500).json({ message: 'Error creating user', error: insertError });
      }

      return res.status(201).json({ message: 'Signup successful', userData: newUser });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
