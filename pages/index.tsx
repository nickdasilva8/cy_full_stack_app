import { Container } from '@mantine/core';

import { Welcome } from '../components/Welcome/Welcome';
import { Header } from '@/components/Header/Header';
import { SleepForm } from '@/components/SleepForm/SleepForm';

export default function HomePage() {
  return (
    <>
      <Header>
        <Welcome isNewRecord isExistingRecords={false} />
      </Header>
      <main>
        <Container>
          <SleepForm />
        </Container>
      </main>
    </>
  );
}
