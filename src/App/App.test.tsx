import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component with Navbar and GitHubRepos', () => {
  render(<App />);
  expect(screen.getByText(/GitHub Repository/i)).toBeInTheDocument();
});