import { render, screen } from '@/test-utils';
import { SleepForm } from './SleepForm';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<SleepForm />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/next/'
    );
  });
});
