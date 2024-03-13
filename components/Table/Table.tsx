import { useState } from 'react';
import { Table as MantineTable, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ReactECharts from 'echarts-for-react';

import { User } from '@/server/users';

import classes from './Table.module.css';

type TableProps = {
  users: User[];
};

export const Table: React.FunctionComponent<TableProps> = ({ users }): JSX.Element => {
  const [option, setOption] = useState(null); // state to hold the chart options
  const [selectedUser, setSelectedUser] = useState(''); // state to hold the chart options
  const [opened, { open, close }] = useDisclosure(false);

  const rows = users.map((user) => (
    <MantineTable.Tr
      key={user.name}
      className={classes['cursor-pointer']}
      onClick={() => {
        const data = user.SleepRecord.map((record) => ({
          name: new Date(record.createdAt).toLocaleDateString('en-GB'),
          value: record.duration,
        }));

        // Set the options for the chart
        setOption({
          xAxis: {
            type: 'category',
            data: data.map((item) => item.name),
            name: 'Date',
          },
          yAxis: {
            type: 'value',
            name: 'Sleep time duration',
          },
          series: [
            {
              data: data.map((item) => item.value),
              type: 'bar',
            },
          ],
        });

        setSelectedUser(user.name);
        return open();
      }}
    >
      <MantineTable.Td>{user.name}</MantineTable.Td>
      <MantineTable.Td>{user.Gender.title}</MantineTable.Td>
      <MantineTable.Td>{user._count.SleepRecord}</MantineTable.Td>
    </MantineTable.Tr>
  ));

  return (
    <>
      <MantineTable mt="xl">
        <MantineTable.Thead>
          <MantineTable.Tr>
            <MantineTable.Th>Name</MantineTable.Th>
            <MantineTable.Th>Gender</MantineTable.Th>
            <MantineTable.Th>Total sleep records</MantineTable.Th>
          </MantineTable.Tr>
        </MantineTable.Thead>
        <MantineTable.Tbody>{rows}</MantineTable.Tbody>
      </MantineTable>
      <Modal
        opened={!!(opened && option)}
        onClose={close}
        title={`Hours ${selectedUser} has slept`}
        size="70%"
      >
        {option ? <ReactECharts option={option} /> : null}
      </Modal>
    </>
  );
};
