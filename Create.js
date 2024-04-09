import React, { useState, useEffect } from 'react';
import './Create.css';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Define the backend API URL

const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [numberOfMembers, setNumberOfMembers] = useState('');
  const [status, setStatus] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/create`, {
        title,
        description,
        dueDate,
        priority,
        numberOfMembers,
        status
      });
      console.log('Task created:', response.data);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('');
      setNumberOfMembers('');
      setStatus('');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Error creating task. Please try again.');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Error fetching tasks. Please try again.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="form-container">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <label>Number of Members:</label>
        <input type="number" value={numberOfMembers} onChange={(e) => setNumberOfMembers(e.target.value)} required />
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Not Assigned">Not Assigned</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
      {error && <div className="error">{error}</div>} {/* Display error message */}
      <div>
        <h2>Fetched Tasks</h2>
        <ul>
          {tasks.map(task => (
            <li key={task._id}>{task.title} - {task.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Create;
