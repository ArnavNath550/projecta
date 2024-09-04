// pages/api/save-user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UserSession {
  name: string | null;
  email: string | null;
  image: string | null;
}

interface SaveUserRequest extends NextApiRequest {
  body: {
    user: UserSession;
  };
}

export default async function handler(req: SaveUserRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user } = req.body;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { userId: user.email ?? '' },
      });

      // If the user does not exist, create a new record
      if (!existingUser) {
        await prisma.user.create({
          data: {
            firstName: user.name?.split(' ')[0] || '',
            lastName: user.name?.split(' ')[1] || '',
            profilePic: user.image || '',
            userId: user.email || '',
            dateCreated: new Date(),
          },
        });
      }

      res.status(200).json({ message: 'User saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error saving user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
