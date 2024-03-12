import { Container } from 'react-bootstrap';

export function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <Container className="py-3">
        <h2 className="title">Cy sleep tracker</h2>
        <p>© 2021 Cy Sleep Tracker</p>
      </Container>
    </footer>
  );
}
