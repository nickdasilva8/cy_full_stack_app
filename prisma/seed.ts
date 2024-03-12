import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const genderData: Prisma.GenderCreateInput[] = [
  {
    title: 'Male',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Female',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Other',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Prefer not to say',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function main() {
  console.log('Start seeding ...');
  for (const genderOption of genderData) {
    const gender = await prisma.gender.create({
      data: genderOption,
    });
    console.log(`Created gender '${gender.title}' with id: ${gender.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
