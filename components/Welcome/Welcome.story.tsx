import { Welcome } from './Welcome';

export default {
  title: 'Welcome',
};

export const Usage = () => [
  <Welcome isExistingRecords isNewRecord={false} />,
  <Welcome isExistingRecords={false} isNewRecord />,
];
