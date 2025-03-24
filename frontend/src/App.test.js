import { render } from '@testing-library/react';
import App from './App';

// simulate React Router DOM
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: () => <div data-testid="route">Route</div>,
  Navigate: () => <div data-testid="navigate">Navigate</div>
}));

// simulate AuthContext
jest.mock('./context/AuthContext', () => ({
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>
}));

test('renders App component without crashing', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('browser-router')).toBeInTheDocument();
});