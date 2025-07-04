import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    priority: 'Medium',
    type: 'Assignment',
    completed: false
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const res = await axios.get(`/api/tasks/${id}`);
        setTask(res.data);
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    // Prepare the payload for the backend
    const payload = {
      title: task.title,
      description: task.description,
      subject: task.subject,
      dueDate: task.dueDate,
      priority: task.priority,
      type: task.type,
      completed: task.completed
    };
    if (id) {
      await axios.put('/api/tasks/' + id, payload);
    } else {
      await axios.post('/api/tasks', payload);
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-lg mx-auto bg-white bg-opacity-70 backdrop-blur-md p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {id ? 'Edit Task' : 'Add New Task'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              value={task.title}
              onChange={e => setTask({ ...task, title: e.target.value })}
              placeholder="Enter task title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={task.description}
              onChange={e => setTask({ ...task, description: e.target.value })}
              placeholder="Enter task description"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Subject</label>
            <input
              type="text"
              value={task.subject}
              onChange={e => setTask({ ...task, subject: e.target.value })}
              placeholder="Enter subject or course"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Priority</label>
            <select
              value={task.priority}
              onChange={e => setTask({ ...task, priority: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Type</label>
            <select
              value={task.type}
              onChange={e => setTask({ ...task, type: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Assignment">Assignment</option>
              <option value="Exam">Exam</option>
              <option value="Reading">Reading</option>
              <option value="Project">Project</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={task.dueDate ? task.dueDate.split('T')[0] : ''}
              onChange={e => setTask({ ...task, dueDate: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            {id ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;