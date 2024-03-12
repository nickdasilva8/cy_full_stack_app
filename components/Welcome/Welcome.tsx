import { Title } from '@mantine/core';
import classes from './Welcome.module.css';

export const Welcome: React.FunctionComponent = () => (
  <Title className={classes.title} ta="center" mt={100}>
    Cy&apos;s sleep tracking app!
  </Title>
);
