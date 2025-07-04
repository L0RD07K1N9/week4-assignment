import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, setTasks }) => {
  const deleteTask = async () => {
    await axios.delete(`https://week-4-integrating-the-mern-stack.onrender.com/api/tasks/${task._id}`);
    setTasks(prev => prev.filter(t => t._id !== task._id));
  };


  // Color for completed status only, as status is now replaced by completed boolean
  const completedColor = task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-gray-600">{task.description || 'No description'}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            Subject: {task.subject}
          </span>
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
            Priority: {task.priority}
          </span>
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-800">
            Type: {task.type}
          </span>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${completedColor}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
        </p>
      </div>
      <div className="flex space-x-2">
        <Link
          to={`/edit/${task._id}`}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          Edit
        </Link>
        <button
          onClick={deleteTask}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;