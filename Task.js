import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks'); // Change the URL according to your backend API endpoint
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columnsToDisplay = ['title', 'description', 'dueDate', 'priority', 'numberOfMembers', 'status'];

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const handleEdit = (id) => {
    // Implement functionality to navigate to the edit page or modal with the task id
  };

  const handleTeamMember = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks/${id}/team`);
      const teamMembers = response.data;
      // Implement functionality to display team members (e.g., in a modal)
      console.log('Team Members:', teamMembers);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  return (
    <div>
      <h2>Data Table</h2>
      <table>
        <thead>
          <tr>
            {columnsToDisplay.map(column => (
              <th key={column}>{column}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columnsToDisplay.map((column, columnIndex) => (
                <td key={columnIndex}>{item[column]}</td>
              ))}
              <td>
                <button onClick={() => handleRemove(item._id)}>Remove</button>
                <button onClick={() => handleEdit(item._id)}>Edit</button>
                <button onClick={() => handleTeamMember(item._id)}>Team Member</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDisplay;
