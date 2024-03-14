import { Title, Text } from '@mantine/core';

import classes from './Welcome.module.css';

export const Welcome: React.FunctionComponent<{
  isNewRecord: boolean;
  isExistingRecords: boolean;
}> = ({ isNewRecord, isExistingRecords }) => (
  <div>
    <Title className={classes.title} ta="center" mt={50} mb="lg">
      Cy&apos;s sleep tracking app!
    </Title>
    <div className={classes.links}>
      <Text component="a" href="/" td={isNewRecord ? 'underline' : ''}>
        Submit a new record
      </Text>
      <Text ml="lg" component="a" href="/logs" td={isExistingRecords ? 'underline' : ''}>
        Review existing records
      </Text>
    </div>
  </div>
);
