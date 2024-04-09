const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const MONGODB_HOST = '127.0.0.1';
const MONGODB_PORT = '27017';
const DB_NAME = 'myproject';

const MONGODB_URI = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${DB_NAME}`;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(`Connected to MongoDB at ${MONGODB_URI}`))
.catch(err => console.error('Error connecting to MongoDB:', err.message));

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
  numberOfMembers: Number,
  status: String,
});

const Task = mongoose.model('Task', taskSchema);

// Add route to remove the entire collection
app.delete('/tasks', async (req, res) => {
  try {
    await Task.deleteMany({});
    res.status(200).json({ message: 'Collection removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add route to edit a task by ID
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add route to view team members for a task by ID
app.get('/tasks/:id/team', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Implement logic to fetch team members associated with this task
    // Example: const teamMembers = await TeamMember.find({ taskId: id });
    const teamMembers = []; // Replace with actual logic
    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Existing route to create a new task
app.post('/create', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Existing route to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
