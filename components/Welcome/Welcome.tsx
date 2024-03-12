import { Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Cy's sleep tracking app!
      </Title>
    </>
  );
}
