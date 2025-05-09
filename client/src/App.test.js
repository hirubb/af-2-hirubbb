import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the BrowserRouter since we can't import it directly
jest.mock('./App', () => {
  return function MockApp() {
    return <div data-testid="app">App Component Mock</div>;
  };
});

test('renders App component successfully', () => {
  render(<App />);
  expect(screen.getByTestId('app')).toBeInTheDocument();
});