import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@prisma/client';
import { sleepRecordSchema } from '@/utils/schema';
import prisma from '@/db-client/prisma';
import { GenderID } from '@/utils/enum';

/**
 * - It first checks if the incoming request is a POST request.
 *   If it's not, it returns a 405 status code with an error message indicating that only GET and POST methods are allowed.
 * - It then uses the Zod library to validate and sanitize the data in the request body.
 *   The data is expected to match the structure defined in sleepRecordSchema.
 * - If the data validation fails,
 *   it returns a 400 status code with an error message and details about the validation errors.
 * - If the data validation is successful, it extracts the name, gender,
 *   and hoursSlept values from the validated data.
 * - It then parses the gender value into a genderId using an enumeration (GenderID).
 * - It initializes a user variable and a uniqueConstraintViolation flag.
 * - It attempts to create a new user in the database using Prisma's create method.
 * - If the create method throws a unique constraint violation error (P2002),
 *   it sets the uniqueConstraintViolation flag to true.
 * - If the uniqueConstraintViolation flag is true,
 *   it attempts to find the user in the database using Prisma's findFirst method.
 * - If the user is not found, it returns a 500 status code with an error message.
 * - If the user is found, it initializes a newSleepRecord variable and attempts
 *   to create a new sleep record in the database using Prisma's create method.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // dismiss any request that isn't a POST
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

  // Zod ensures that the response.data object is properly typed
  const { name, gender, hoursSlept } = response.data;

  // it's safe to parse this as zod has already validated it
  const genderId = parseInt(GenderID[gender as unknown as number], 10);

  let user: User | null = null;

  let uniqueConstraintViolation = false;
  /**
   * attempt to create a new user in the database
   * TODO:: This could be turned into a function in a client file and imported here
   */
  try {
    user = await prisma.user.create({
      data: {
        name,
        gender_id: genderId,
      },
    });
  } catch (err: any) {
    // P2002 is the Prisma error code for unique constraint violation
    if (err?.code !== 'P2002') {
      return res
        .status(500)
        .json({ error: { message: 'An error occurred while inserting the user.' } });
    }
    uniqueConstraintViolation = true;
  }

  if (uniqueConstraintViolation) {
    /**
     * attempt to select the existing user from the database
     * TODO:: This could be turned into a function in a client file and imported here
     */
    try {
      user = await prisma.user.findFirst({
        where: {
          name,
        },
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: { message: 'An error occurred while inserting the user.' } });
    }
  }

  if (!user) {
    // not sure how you'd get here tbh, but best to handle it anyway
    return res.status(500).json({
      error: { message: "Unable to create the user, but also couldn't retrieve the user." },
    });
  }

  /**
   * attempt to insert the new sleep record into the database for the user
   * TODO:: This could be turned into a function in a client file and imported here
   */
  try {
    // Insert a new sleep record for the user
    const newSleepRecord = await prisma.sleepRecord.create({
      data: {
        user_id: user.id, // Link the sleep record to the user
        duration: hoursSlept,
        date: new Date(),
      },
    });

    return res.status(200).json(newSleepRecord);
  } catch (err) {
    // you'd log errors here, but for now, just return a generic error message
    return res
      .status(500)
      .json({ error: { message: 'An error occurred while inserting the user.' } });
  }
}
