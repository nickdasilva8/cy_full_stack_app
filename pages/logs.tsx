import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Container } from '@mantine/core';

import { getUsersWithSleepRecordCount } from '@/server/users';
import { Welcome } from '@/components/Welcome/Welcome';
import { Header } from '@/components/Header/Header';
import { Table } from '@/components/Table/Table';
import { User } from '@/utils/types';

export const getServerSideProps = (async () => {
  // Fetch data from external API
  // if this proved to be slow, we could:
  // - implement pagination
  // - use cashing
  // use client side FETCHing to get the data, allowing the page to load while the data is being fetched
  const users: User[] = await getUsersWithSleepRecordCount();

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
