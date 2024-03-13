import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Container, Table as Temp } from '@mantine/core';

import { getUsersWithSleepRecordCount, User } from '@/server/users';
import { Welcome } from '@/components/Welcome/Welcome';
import { Header } from '@/components/Header/Header';
import { Table } from '@/components/Table/Table';

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const users: User[] = await getUsersWithSleepRecordCount();

  // Pass data to the page via props
  return { props: { users } };
}) satisfies GetServerSideProps<{ users: User[] }>;

export default function HomePage({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header>
        <Welcome />
      </Header>
      <main>
        <Container>
          <Table users={users} />
        </Container>
      </main>
    </>
  );
}
