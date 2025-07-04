const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a task with explicit validation
router.post('/', async (req, res) => {
  const { title, subject, dueDate, priority, type } = req.body;
  if (!title || !subject || !dueDate || !priority || !type) {
    return res.status(400).json({
      error: 'Missing required fields: title, subject, dueDate, priority, and type are required.'
    });
  }
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tasks, with optional filtering by subject and dueDate
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.subject) {
      filter.subject = req.query.subject;
    }
    if (req.query.dueDate) {
      // Find tasks due on a specific date (ignoring time)
      const date = new Date(req.query.dueDate);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      filter.dueDate = { $gte: date, $lt: nextDay };
    }
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;