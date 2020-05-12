import React from 'react';
import { render, screen } from 'render';
import App from '../pages';
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

test('basic rendering', async () => {
  render(<App />);
  const [homeLink] = screen.getAllByRole('link');
  expect(homeLink).toHaveTextContent('Home');
  expect(screen.getByRole('button')).toHaveTextContent('Connect Wallet');
});
