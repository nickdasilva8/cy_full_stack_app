import { render, screen } from '@/test-utils';
import { Header } from './Header';

describe('Welcome component', () => {
  it('Welcome component implements composition properly', () => {
    render(
      <Header>
        <h1>I&apos;m correctly rendered within the component</h1>
      </Header>
    );
    expect(screen.getByText("I'm correctly rendered within the component")).toBeInTheDocument();
  });
});
