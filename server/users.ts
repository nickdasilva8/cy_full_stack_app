import { format } from 'date-fns';
import prisma from '@/db-client/prisma';
import { GenderID } from '@/utils/enum';

import { User, UserRaw, UserBaseWithDate, SleepRecordBase } from '@/utils/types';

/**
 *
 * @example const user = await createUser({ name, genderId });
 * @param param { name: string, genderId: GenderID}
 * @returns Promise<UserBaseWithDate>
 */
export const createUser = async ({
  name,
  genderId,
}: {
  name: string;
  genderId: GenderID;
}): Promise<UserBaseWithDate> => {
  const user: UserBaseWithDate = await prisma.user.create({
    data: {
      name: name.toLowerCase(),
      gender_id: genderId,
    },
  });

  return user;
};

/**
 * @example const user = await getUserByName('John Doe');
 * @param name string
 * @returns Promise<UserBaseWithDate | null>
 */
export const getUserByName = async (name: string): Promise<UserBaseWithDate | null> => {
  const user: UserBaseWithDate | null = await prisma.user.findFirst({
    where: {
      name: name.toLowerCase(),
    },
  });

  return user;
};

/**
 * @example const user = await createSleepRecord({ userId, hoursSlept, date });
 * @param param { userId: number, hoursSlept: number, date: Date }
 * @returns SleepRecordBase
 */
export const createSleepRecord = async ({
  userId,
  hoursSlept,
  date,
}: {
  userId: number;
  hoursSlept: number;
  date: Date;
}): Promise<SleepRecordBase> => {
  const formattedDate = format(new Date(date), 'yyyy-MM-dd');

  const newSleepRecord: SleepRecordBase = await prisma.sleepRecord.create({
    data: {
      user_id: userId,
      duration: hoursSlept,
      date: formattedDate,
    },
  });

  return newSleepRecord;
};

/**
 * Get all sleep records for all users
 * @example const users = await getUsersWithSleepRecordCount();
 * @returns Promise<User[]>
 */
export const getUsersWithSleepRecordCount = async (): Promise<User[]> => {
  const users: UserRaw[] = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      gender_id: true,
      Gender: {
        select: {
          title: true,
        },
      },
      SleepRecord: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          duration: true,
        },
        orderBy: [
          {
            date: 'asc',
          },
          {
            createdAt: 'asc',
          },
        ],
      },
      _count: {
        select: { SleepRecord: true },
      },
    },
  });

  // Convert Date objects to strings
  const usersWithDatesAsStrings: User[] = users.map((user) => ({
    ...user,
    SleepRecord: user.SleepRecord.map((record) => ({
      ...record,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    })),
  }));

  return usersWithDatesAsStrings;
};
