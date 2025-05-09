import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

test('searches countries and updates the list', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Japan' } });

  const result = await screen.findByText('Japan');
  expect(result).toBeInTheDocument();
});
