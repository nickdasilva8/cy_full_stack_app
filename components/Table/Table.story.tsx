import { Table } from './Table';

export default {
  title: 'Welcome',
};

export const exampleUsers = [
  {
    id: 19,
    name: 'Zoe Deo',
    gender_id: 2,
    Gender: {
      title: 'Female',
    },
    SleepRecord: [
      {
        id: 13,
        createdAt: '2024-03-13T16:03:59.018Z',
        updatedAt: '2024-03-13T16:03:59.018Z',
        duration: 7,
      },
    ],
    _count: {
      SleepRecord: 1,
    },
  },
  {
    id: 4,
    name: 'nick',
    gender_id: 1,
    Gender: {
      title: 'Male',
    },
    SleepRecord: [
      {
        id: 5,
        createdAt: '2024-03-12T22:20:13.388Z',
        updatedAt: '2024-03-12T22:20:13.388Z',
        duration: 8,
      },
      {
        id: 1,
        createdAt: '2024-03-08T22:14:14.671Z',
        updatedAt: '2024-03-12T22:14:14.671Z',
        duration: 5,
      },
      {
        id: 2,
        createdAt: '2024-03-09T22:14:20.481Z',
        updatedAt: '2024-03-12T22:14:20.481Z',
        duration: 6,
      },
      {
        id: 3,
        createdAt: '2024-03-10T22:14:23.303Z',
        updatedAt: '2024-03-12T22:14:23.303Z',
        duration: 8,
      },
      {
        id: 4,
        createdAt: '2024-03-11T22:20:12.229Z',
        updatedAt: '2024-03-12T22:20:12.229Z',
        duration: 8,
      },
      {
        id: 6,
        createdAt: '2024-03-13T22:20:14.781Z',
        updatedAt: '2024-03-12T22:20:14.781Z',
        duration: 8,
      },
      {
        id: 14,
        createdAt: '2024-03-13T17:14:05.670Z',
        updatedAt: '2024-03-13T17:14:05.670Z',
        duration: 10,
      },
      {
        id: 15,
        createdAt: '2024-03-13T17:27:50.794Z',
        updatedAt: '2024-03-13T17:27:50.794Z',
        duration: 7,
      },
      {
        id: 16,
        createdAt: '2024-03-13T17:29:30.435Z',
        updatedAt: '2024-03-13T17:29:30.435Z',
        duration: 7,
      },
      {
        id: 17,
        createdAt: '2024-03-13T17:29:40.712Z',
        updatedAt: '2024-03-13T17:29:40.712Z',
        duration: 7,
      },
      {
        id: 18,
        createdAt: '2024-03-13T17:32:19.517Z',
        updatedAt: '2024-03-13T17:32:19.517Z',
        duration: 7,
      },
      {
        id: 19,
        createdAt: '2024-03-13T17:34:10.196Z',
        updatedAt: '2024-03-13T17:34:10.196Z',
        duration: 11,
      },
    ],
    _count: {
      SleepRecord: 12,
    },
  },
  {
    id: 14,
    name: 'Zoe Chills',
    gender_id: 4,
    Gender: {
      title: 'Prefer not to say',
    },
    SleepRecord: [
      {
        id: 8,
        createdAt: '2024-03-12T22:58:01.320Z',
        updatedAt: '2024-03-12T22:58:01.320Z',
        duration: 5,
      },
      {
        id: 9,
        createdAt: '2024-03-12T22:58:04.949Z',
        updatedAt: '2024-03-12T22:58:04.949Z',
        duration: 6,
      },
      {
        id: 10,
        createdAt: '2024-03-12T22:58:07.521Z',
        updatedAt: '2024-03-12T22:58:07.521Z',
        duration: 24,
      },
      {
        id: 11,
        createdAt: '2024-03-12T22:58:57.037Z',
        updatedAt: '2024-03-12T22:58:57.037Z',
        duration: 20,
      },
    ],
    _count: {
      SleepRecord: 4,
    },
  },
  {
    id: 13,
    name: 'John Doe',
    gender_id: 3,
    Gender: {
      title: 'Other',
    },
    SleepRecord: [
      {
        id: 7,
        createdAt: '2024-03-12T22:41:04.072Z',
        updatedAt: '2024-03-12T22:41:04.072Z',
        duration: 7,
      },
    ],
    _count: {
      SleepRecord: 1,
    },
  },
  {
    id: 18,
    name: 'Nick',
    gender_id: 3,
    Gender: {
      title: 'Other',
    },
    SleepRecord: [
      {
        id: 12,
        createdAt: '2024-03-13T16:03:36.191Z',
        updatedAt: '2024-03-13T16:03:36.191Z',
        duration: 7,
      },
    ],
    _count: {
      SleepRecord: 1,
    },
  },
];

export const Usage = () => <Table users={exampleUsers} />;
