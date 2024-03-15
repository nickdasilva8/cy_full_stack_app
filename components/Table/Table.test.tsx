import { render, screen } from '@/test-utils';
import { Table } from './Table';
import { exampleUsers } from './Table.story';

describe('Welcome component', () => {
  it('Welcome component rendered the expected message', () => {
    render(<Table users={exampleUsers} />);
    expect(screen.getByText('nick')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Total sleep records')).toBeInTheDocument();
  });
});
