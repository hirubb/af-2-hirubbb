import React from 'react';
import { render } from '@testing-library/react';

// Create a custom render method that includes providers
export function renderWithRouter(ui, {
  route = '/',
  history = {
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    goBack: jest.fn(),
    goForward: jest.fn(),
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: route }
  },
  ...renderOptions
} = {}) {
  // Create a mock router context
  const RouterContext = React.createContext({
    history,
    location: history.location,
    match: { path: route, url: route, isExact: true, params: {} },
    staticContext: undefined
  });

  function MockRouter({ children }) {
    return (
      <RouterContext.Provider value={{
        history,
        location: history.location,
        match: { path: route, url: route, isExact: true, params: {} }
      }}>
        {children}
      </RouterContext.Provider>
    );
  }

  return render(
    <MockRouter>
      {ui}
    </MockRouter>,
    renderOptions
  );
}

// Export everything from react-testing-library
export * from '@testing-library/react';