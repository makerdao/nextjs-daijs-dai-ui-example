import React from 'react';
import { render, screen } from 'render';
import App from '../';

test('basic rendering', async () => {
  render(<App />);
  const [homeLink] = screen.getAllByRole('link');
  expect(homeLink).toHaveTextContent('Home');
  expect(screen.getByRole('button')).toHaveTextContent('Connect Wallet');
});
