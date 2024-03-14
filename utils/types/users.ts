export interface UserBase {
  id: number;
  name: string;
  gender_id: number;
}

export interface UserBaseWithDate extends UserBase {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRaw extends UserBase {
  Gender: {
    title: string;
  };
  SleepRecord: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    duration: number;
  }[];
  _count: {
    SleepRecord: number;
  };
}

export interface User extends UserBase {
  Gender: { title: string };
  SleepRecord: {
    id: number;
    createdAt: string;
    updatedAt: string;
    duration: number;
  }[];
  _count: {
    SleepRecord: number;
  };
}
