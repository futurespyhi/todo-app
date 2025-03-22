const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

const router = express.Router();

// Get all tasks(protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Get all tasks for the current user
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//  Create a task(protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new task
    const newTask = new Task({
      title,
      description,
      user: req.user.id, // relate the task to the current user
    });

    // save the task
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// refresh a task（protected）
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    // find the task
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'task is not found' });
    }

    // Check if the task belongs to the current user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // refresh the task
    task.title = title;
    task.description = description;
    task.completed = completed;

    // save updates
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// delete a task（protected）
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // find a task
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'task is not found' });
    }

    // check whether the task belongs to the current user or not
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    // delete the task
    await task.deleteOne();
    res.json({ message: 'task deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;