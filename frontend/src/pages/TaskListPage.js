import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, List, ListItem, ListItemText, Checkbox, TextField } from '@mui/material';
import { getTasks, createTask, updateTask, deleteTask } from '../api';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks(token);
        setTasks(tasks);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [token]);

  const handleCreateTask = async () => {
    try {
      const task = await createTask(newTaskTitle, newTaskDescription, token);
      setTasks([...tasks, task]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = await updateTask(task._id, task.title, task.description, !task.completed, token);
      setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Task List</Typography>
      <TextField
        label="Title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleCreateTask} variant="contained" color="primary">
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            <Checkbox checked={task.completed} onChange={() => handleToggleComplete(task)} />
            <ListItemText primary={task.title} secondary={task.description} />
            <Button onClick={() => handleDelete(task._id)} color="secondary">
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskListPage;