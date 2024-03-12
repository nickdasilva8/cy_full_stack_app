import type { NextApiRequest, NextApiResponse } from 'next';
import { sleepRecordSchema } from '@/utils/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      error: { message: `Method ${method} Not Allowed` },
    });
  }

  // Zod provides input sanitization and validation
  const response = sleepRecordSchema.safeParse(req.body);

  if (!response.success) {
    const { errors } = response.error;
    // this generates a useful message in the API, explaining what failed validation
    // probably not suitable for production, but useful for development
    // in production, you might want to log the error and return a generic error message
    return res.status(400).json({
      error: { message: 'Invalid request', errors },
    });
  }

  const { name, gender, hoursSlept } = response.data;

  return res.status(200).json({ message: 'Success', data: { name, gender, hoursSlept } });
}
