import { Container } from '@mantine/core';

type HeaderProps = {
  children: React.ReactNode;
};

export const Header: React.FunctionComponent<HeaderProps> = ({ children }: HeaderProps) => (
  <header>
    <Container>{children}</Container>
  </header>
);
