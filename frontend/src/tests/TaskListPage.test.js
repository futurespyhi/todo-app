import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TaskListPage from '../pages/TaskListPage';

test('renders task list', () => {
  render(
    <Router>
      <TaskListPage />
    </Router>
  );
  expect(screen.getByText('Task List')).toBeInTheDocument();
});