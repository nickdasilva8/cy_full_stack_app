import { useState } from 'react';
import { TextInput, Button, Group, Box, Select, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from './SleepForm.module.css';

interface FormValues {
  name: string;
  gender: string;
  hoursSlept: number;
}

export const SleepForm: React.FunctionComponent = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [forceRerender, setForceRerender] = useState<string>(`${new Date().valueOf()}`);

  // this list should retrieved from the database, but that feels out of scope for this example
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'Prefer_not_to_say', label: 'Prefer not to say' },
  ];

  const form = useForm({
    name: 'sleep-form',
    initialValues: {
      name: '',
      gender: '',
      hoursSlept: 7, // national average for the UK! if you wanted nothing to be selected, you could use null
    },

    validate: {
      // TODO:: make this trim the input, to eliminate leading and trailing whitespace
      name: (value) =>
        /^[A-Za-z\s]+$/.test(value) ? null : 'Name can only consistent of Letters and spaces',
      gender: (value) =>
        genderOptions.map((data) => data.value).includes(value) ? null : 'Invalid gender option',
      hoursSlept: (value) => {
        if (value === null) {
          return 'Hours slept is required';
        }
        if (value >= 0 && value <= 24) {
          return null;
        }

        return 'Invalid hours slept';
      },
    },
  });

  const postData = async (values: FormValues) => {
    setIsLoading(true);
    const valuesToPost = { ...values, name: values.name.trim() };

    try {
      const response = await fetch('/api/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valuesToPost),
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      // TODO:: clear the form here
      form.reset();

      // this is a questionable work around
      // but it's a reliable way to force Select to re-render
      // mantine has some nasty work around with resetting the form
      // value of the Select component. This works for now, but
      // it's not ideal and I'd definitely want to fix this ASAP.
      setForceRerender(`${new Date().valueOf()}`);
    } catch (err) {
      // TODO:: you probably want to render an error message to the user
    }

    setIsLoading(false);
  };

  return (
    <Box maw={340} mx="auto" className={classes['sleep-form']}>
      <form onSubmit={form.onSubmit((values) => postData(values))}>
        <TextInput
          mt="md"
          withAsterisk
          label="name"
          placeholder="Your name"
          {...form.getInputProps('name')}
        />

        <Select
          key={forceRerender}
          mt="md"
          withAsterisk
          label="Your gender"
          data={genderOptions}
          {...form.getInputProps('gender')}
        />

        <NumberInput
          mt="md"
          withAsterisk
          label="Hours slept"
          min={0}
          max={24}
          {...form.getInputProps('hoursSlept')}
        />

        <Group justify="flex-end" pt="xl">
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};
