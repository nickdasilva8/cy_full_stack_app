import { render, screen } from '@/test-utils';
import { Welcome } from './Table';

describe('Welcome component', () => {
  it('Welcome component rendered the expected message', () => {
    render(<Welcome />);
    expect(screen.getByText("Cy's sleep tracking app!")).toBeInTheDocument();
  });
});
