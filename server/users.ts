import prisma from '@/db-client/prisma';

interface UserRaw {
  Gender: {
    title: string;
  };
  SleepRecord: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    duration: number;
  }[];
  id: number;
  name: string;
  gender_id: number;
  _count: {
    SleepRecord: number;
  };
}

export interface User {
  SleepRecord: { createdAt: string; updatedAt: string; id: number; duration: number }[];
  Gender: { title: string };
  id: number;
  name: string;
  gender_id: number;
  _count: { SleepRecord: number };
}

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
