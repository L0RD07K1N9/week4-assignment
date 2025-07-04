import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ subject: '', dueDate: '', priority: '', type: '' });

  const fetchTasks = async (filters = {}) => {
    try {
      const params = {};
      if (filters.subject) params.subject = filters.subject;
      if (filters.dueDate) params.dueDate = filters.dueDate;
      if (filters.priority) params.priority = filters.priority;
      if (filters.type) params.type = filters.type;
      const res = await axios.get('/api/tasks', { params });
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError('Failed to fetch tasks');
      setTasks([]);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks(filters);
    // eslint-disable-next-line
  }, [filters]);

  if (error) return <div className="text-red-600 text-center text-lg font-semibold">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">✨🧾Task Manager🚀</h1>
          <Link
            to="/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            + New Task
          </Link>
        </div>
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-4 mb-6 items-end border border-gray-200">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1" htmlFor="filter-subject">Subject</label>
            <div className="relative">
              <span className="absolute left-2 top-2 text-gray-400">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' /></svg>
              </span>
              <input
                id="filter-subject"
                type="text"
                placeholder="e.g. Math"
                value={filters.subject}
                onChange={e => setFilters(f => ({ ...f, subject: e.target.value }))}
                className="pl-8 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1" htmlFor="filter-dueDate">Due Date</label>
            <div className="relative">
              <span className="absolute left-2 top-2 text-gray-400">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg>
              </span>
              <input
                id="filter-dueDate"
                type="date"
                value={filters.dueDate}
                onChange={e => setFilters(f => ({ ...f, dueDate: e.target.value }))}
                className="pl-8 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1" htmlFor="filter-priority">Priority</label>
            <select
              id="filter-priority"
              value={filters.priority}
              onChange={e => setFilters(f => ({ ...f, priority: e.target.value }))}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1" htmlFor="filter-type">Type</label>
            <select
              id="filter-type"
              value={filters.type}
              onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
            >
              <option value="">All Types</option>
              <option value="Assignment">Assignment</option>
              <option value="Exam">Exam</option>
              <option value="Reading">Reading</option>
              <option value="Project">Project</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            onClick={() => setFilters({ subject: '', dueDate: '', priority: '', type: '' })}
            className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            type="button"
          >
            Clear Filters
          </button>
        </div>
        <div className="space-y-4 divide-y divide-gray-200">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center italic">No tasks available. Add one to get started!</p>
          ) : (
            tasks.map(task => (
              <div key={task._id} className="pt-4 first:pt-0">
                <TaskItem task={task} setTasks={setTasks} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;