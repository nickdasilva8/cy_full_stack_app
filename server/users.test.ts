import { getUsersWithSleepRecordCount, createUser } from '@/server/users';
import { GenderID } from '@/utils/enum';
import { UserBaseWithDate, User } from '@/utils/types';

describe('Sleep Records', () => {
  it('create a new user; userone, male (1)', async () => {
    const user: UserBaseWithDate = await createUser({ name: 'userone', genderId: GenderID.Male });
    expect(user.name).toBe('userone');
    expect(user.gender_id).toBe(1);
  });

  it('create a new user; usertwo, female (2)', async () => {
    const user: UserBaseWithDate = await createUser({ name: 'usertwo', genderId: GenderID.Female });
    expect(user.name).toBe('usertwo');
    expect(user.gender_id).toBe(2);
  });

  it('create a new user; userthree, other (3)', async () => {
    const user: UserBaseWithDate = await createUser({
      name: 'userthree',
      genderId: GenderID.Other,
    });
    expect(user.name).toBe('userthree');
    expect(user.gender_id).toBe(3);
  });

  it('create a new user; userfour, other (4)', async () => {
    const user: UserBaseWithDate = await createUser({
      name: 'userfour',
      genderId: GenderID.Prefer_not_to_say,
    });
    expect(user.name).toBe('userfour');
    expect(user.gender_id).toBe(4);
  });

  it('fail creating an existing user; userone, other (1)', async () => {
    let error: any;
    try {
      await createUser({
        name: 'userone',
        genderId: GenderID.Prefer_not_to_say,
      });
    } catch (err) {
      error = err;
    }
    expect(error?.message).toContain('Unique constraint failed on');
    expect(error?.code).toBe('P2002');
  });

  it('retrieve all sleep records', async () => {
    const users: User[] = await getUsersWithSleepRecordCount();
    expect(users.length).toBeGreaterThanOrEqual(3); // accommodates the 3 users created above and the ones I've inserted manually for now
  });
});
