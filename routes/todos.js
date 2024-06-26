const express = require('express');
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

const router = express.Router();

// Create a new Todo
router.post('/', auth, async (req, res) => {
    const { title, description, due_date, priority, subtasks } = req.body;
    try {
        const newTodo = new Todo({
            userId: req.user.id,
            title,
            description,
            due_date: new Date(due_date),
            priority,
            subtasks,
            completed: false
        });

        const todo = await newTodo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all Todos for the logged-in user with search and filter
router.get('/', auth, async (req, res) => {
    const { priority, completed, due_date } = req.query;
    const filters = { userId: req.user.id };

    if (priority) filters.priority = priority;
    if (completed) filters.completed = completed === 'true';
    if (due_date) filters.due_date = new Date(due_date);

    try {
        const todos = await Todo.find(filters);
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//get one todo
router.get('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        if (todo.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a Todo
router.put('/:id', auth, async (req, res) => {
    const { title, description, due_date, priority, completed, subtasks } = req.body;
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        if (todo.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        if (due_date) todo.due_date = new Date(due_date);
        if (title) todo.title = title;
        if (description) todo.description = description;
        if (priority) todo.priority = priority;
        if (subtasks) todo.subtasks = subtasks;
        if (typeof completed === 'boolean') todo.completed = completed;

        await todo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a Todo
router.delete('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        if (todo.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        //remove all subtasks
        todo.subtasks = [];
        await todo.remove();

        res.json({ msg: 'Todo removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add or Update a subtask in a Todo
router.post('/:id/subtasks', auth, async (req, res) => {
    const { title } = req.body;
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        if (todo.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        const newSubtask = {
            title,
            completed: false
        };

        todo.subtasks.push(newSubtask);
        await todo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a subtask from a Todo
router.delete('/:id/subtasks/:subtaskId', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        if (todo.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        const subtask = todo.subtasks.find(subtask => subtask.id === req.params.subtaskId);
        if (!subtask) return res.status(404).json({ msg: 'Subtask not found' });

        todo.subtasks = todo.subtasks.filter(subtask => subtask.id !== req.params.subtaskId);
        await todo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
