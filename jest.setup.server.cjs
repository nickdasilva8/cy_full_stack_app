// jest.setup.cjs
const { PrismaClient, Prisma } = require('@prisma/client');

let prisma;

beforeAll(async () => {
  prisma = new PrismaClient();
  const usersToDelete = ['userone', 'usertwo', 'userthree', 'userfour'];
  await prisma.$executeRaw`DELETE FROM "User" WHERE name IN (${Prisma.join(usersToDelete)})`;
});

// afterEach(async () => {
//   const tables = ['User', 'SleepRecord', 'Gender']; // replace with your actual table names
//   for (const table of tables) {
//     await prisma.$executeRaw(`DELETE FROM "${table}"`);
//   }
// });

afterAll(async () => {
  const usersToDelete = ['userone', 'usertwo', 'userthree', 'userfour'];
  await prisma.$executeRaw`DELETE FROM "User" WHERE name IN (${Prisma.join(usersToDelete)})`;
  await prisma.$disconnect();
});

global.prisma = prisma;
