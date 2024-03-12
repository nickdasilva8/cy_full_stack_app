import { render, screen } from '@/test-utils';
import { SleepForm } from './SleepForm';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<SleepForm />);
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('Your gender')).toBeInTheDocument();
    expect(screen.getByText('Hours slept')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
