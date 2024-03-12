import { z } from 'zod';

export const sleepRecordSchema = z.object({
  name: z.string(),
  gender: z.string(),
  hoursSlept: z.number().int().min(0).max(24),
});
