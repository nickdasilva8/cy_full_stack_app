import { render, screen } from '@/test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('Welcome component, records page', () => {
    render(<Welcome isExistingRecords isNewRecord={false} />);
    const textElement = screen.getByText("Cy's sleep tracking app!");
    const textElementActive = screen.getByText('Review existing records');
    expect(textElement).toBeInTheDocument();
    expect(textElementActive).toHaveStyle('text-decoration: underline');
  });
  it('Welcome component, new record page', () => {
    render(<Welcome isExistingRecords={false} isNewRecord />);
    const textElement = screen.getByText("Cy's sleep tracking app!");
    const textElementActive = screen.getByText('Submit a new record');
    expect(textElement).toBeInTheDocument();
    expect(textElementActive).toHaveStyle('text-decoration: underline');
  });
});
