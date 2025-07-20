import React, { useState } from 'react'

const AcceptTask = ({ data, onTaskUpdate }) => {
  // State to hold comment input for a task
  const [comment, setComment] = useState('')

  // Filter out all active tasks (not completed or failed)
  const activeTasks = data.tasks?.filter(
    task => task.active && !task.completed && !task.failed
  ) || [];

  // Function to mark a task as completed
  const handleCompleteTask = (taskId) => {
    // Get all employees from localStorage
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');

    // Update the specific employee's task
    const updatedEmployees = employees.map(emp => {
      if (emp.email === data.email) {
        const updatedTasks = emp.tasks.map(task => {
          if (task.id === taskId) {
            return { 
              ...task, 
              active: false,        // Deactivate the task
              completed: true,      // Mark as completed
              completedAt: new Date().toISOString(), // Add timestamp
              comment: comment.trim() || task.comment // Save comment if added
            };
          }
          return task;
        });

        // Update task counts
        const updatedTaskCounts = {
          newTask: emp.taskcounts?.newTask || 0,
          active: Math.max(0, (emp.taskcounts?.active || 0) - 1), // Decrement active
          completed: (emp.taskcounts?.completed || 0) + 1,        // Increment completed
          failed: emp.taskcounts?.failed || 0
        };

        return { ...emp, tasks: updatedTasks, taskcounts: updatedTaskCounts };
      }
      return emp;
    });

    // Save updated employees back to localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    // Clear comment field
    setComment('');
    // Notify parent component to refresh data
    onTaskUpdate();
  };

  // Function to mark a task as failed
  const handleFailTask = (taskId) => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');

    const updatedEmployees = employees.map(emp => {
      if (emp.email === data.email) {
        const updatedTasks = emp.tasks.map(task => {
          if (task.id === taskId) {
            return { 
              ...task, 
              active: false,      // Deactivate the task
              failed: true,       // Mark as failed
              failedAt: new Date().toISOString(), // Add timestamp
              comment: comment.trim() || task.comment
            };
          }
          return task;
        });

        // Update task counts
        const updatedTaskCounts = {
          newTask: emp.taskcounts?.newTask || 0,
          active: Math.max(0, (emp.taskcounts?.active || 0) - 1),
          completed: emp.taskcounts?.completed || 0,
          failed: (emp.taskcounts?.failed || 0) + 1 // Increment failed count
        };

        return { ...emp, tasks: updatedTasks, taskcounts: updatedTaskCounts };
      }
      return emp;
    });

    // Save updated employees back to localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    // Clear comment field
    setComment('');
    // Notify parent component to refresh data
    onTaskUpdate();
  };

  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
      <h2 className='text-2xl font-bold text-white mb-4'>Active Tasks</h2>
      <div className='space-y-4'>
        {/* Display message if no active tasks */}
        {activeTasks.length === 0 ? (
          <p className='text-gray-400 text-center py-4'>No active tasks</p>
        ) : (
          // Render all active tasks
          activeTasks.map((task) => (
            <div key={task.id} className='bg-yellow-950 border border-yellow-500 rounded p-4'>
              {/* Task title and priority */}
              <div className='flex justify-between items-start mb-3'>
                <h3 className='text-lg font-semibold text-white'>{task.title}</h3>
                <span className='px-2 py-1 rounded text-xs font-medium bg-yellow-600 text-white'>
                  {task.priority}
                </span>
              </div>

              {/* Task description */}
              <p className='text-gray-300 mb-3'>{task.description}</p>

              {/* Task metadata */}
              <div className='flex justify-between items-center text-sm text-gray-400 mb-3'>
                <span>Category: {task.category}</span>
                <span>Due: {task.date}</span>
              </div>
              
              {/* Comment box */}
              <div className='mb-3'>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder='Add a comment (optional)'
                  className='w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm resize-none'
                  rows='2'
                />
              </div>
              
              {/* Action buttons */}
              <div className='flex gap-2'>
                <button
                  onClick={() => handleCompleteTask(task.id)}
                  className='bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-sm rounded shadow font-semibold transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400'
                >
                  Complete Task
                </button>
                <button
                  onClick={() => handleFailTask(task.id)}
                  className='bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-sm rounded shadow font-semibold transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400'
                >
                  Mark as Failed
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AcceptTask;
