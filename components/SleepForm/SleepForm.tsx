import { TextInput, Button, Group, Box, Select } from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from './SleepForm.module.css';

export const SleepForm: React.FunctionComponent = (): JSX.Element => {
  // this list should retrieved from the database, but that feels out of scope for this example
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  // length 25 here will accommodate someone sleeping 0 hours but also someone sleeping 24 hours.
  const hoursSleptOptions: string[] = Array.from({ length: 25 }, (_, i) => `${i}`);

  const form = useForm({
    name: 'sleep-form',
    initialValues: {
      name: '',
      gender: '',
      hoursSlept: '',
    },

    validate: {
      name: (value) =>
        /^[A-Za-z\s]+$/.test(value) ? null : 'Name can only consistent of Letters and spaces',
      gender: (value) => (genderOptions.includes(value) ? null : 'Invalid gender option'),
      hoursSlept: (value) =>
        /^(2[0-4]|1[0-9]|[0-9])$/.test(value)
          ? null
          : 'Hours slept must be between 0 and 24 (inclusive)',
    },
  });

  return (
    <Box maw={340} mx="auto" className={classes['sleep-form']}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          mt="md"
          withAsterisk
          label="name"
          placeholder="Your name"
          {...form.getInputProps('name')}
        />

        <Select
          mt="md"
          label="Your gender"
          placeholder="Gender"
          // The Product team would be expected to have validated that these options are appropriate
          data={genderOptions}
          {...form.getInputProps('gender')}
        />

        <Select
          mt="md"
          label="Hours slept"
          placeholder="hours slept"
          data={hoursSleptOptions}
          {...form.getInputProps('hoursSlept')}
        />

        <Group justify="flex-end" pt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};
