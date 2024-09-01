import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {

  test('renders Navbar', () => {
    render(<App />);
  const navbarElement = screen.getByRole('navigation');
  expect(navbarElement).toBeInTheDocument();
  });
})