import React from 'react'

const NewTask = ({ data, onTaskUpdate }) => {
  // Filter only the tasks that are marked as "new" (not yet accepted)
  const newTasks = data.tasks?.filter(
    task => task.newTask && !task.active && !task.completed && !task.failed
  ) || [];

  // Function to accept a new task and mark it as active
  const handleAcceptTask = (taskId) => {
    // Get all employees from localStorage
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');

    // Find the employee and update their task
    const updatedEmployees = employees.map(emp => {
      if (emp.email === data.email) {
        // Update the specific task to active
        const updatedTasks = emp.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, newTask: false, active: true };
          }
          return task;
        });

        // Update the task counts for this employee
        const updatedTaskCounts = {
          newTask: Math.max(0, (emp.taskcounts?.newTask || 0) - 1), // Decrease newTask count
          active: (emp.taskcounts?.active || 0) + 1,               // Increase active count
          completed: emp.taskcounts?.completed || 0,
          failed: emp.taskcounts?.failed || 0
        };

        return { ...emp, tasks: updatedTasks, taskcounts: updatedTaskCounts };
      }
      return emp;
    });

    // Save updated employee data back to localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    // Notify parent component to refresh data
    onTaskUpdate();
  };

  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
      <h2 className='text-2xl font-bold text-white mb-4'>New Tasks</h2>

      <div className='space-y-4'>
        {/* Show message if there are no new tasks */}
        {newTasks.length === 0 ? (
          <p className='text-gray-400 text-center py-4'>No new tasks available</p>
        ) : (
          // Display all new tasks
          newTasks.map((task) => (
            <div 
              key={task.id} 
              className='bg-blue-950 border border-blue-500 rounded p-4'
            >
              {/* Task title and priority badge */}
              <div className='flex justify-between items-start mb-3'>
                <h3 className='text-lg font-semibold text-white'>{task.title}</h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    task.priority === 'urgent' ? 'bg-red-600 text-white' :
                    task.priority === 'high' ? 'bg-orange-600 text-white' :
                    task.priority === 'medium' ? 'bg-yellow-600 text-white' :
                    'bg-green-600 text-white'
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              {/* Task description */}
              <p className='text-gray-300 mb-3'>{task.description}</p>

              {/* Metadata: Category & Due Date */}
              <div className='flex justify-between items-center text-sm text-gray-400 mb-3'>
                <span>Category: {task.category}</span>
                <span>Due: {task.date}</span>
              </div>

              {/* Accept Task button */}
              <button
                onClick={() => handleAcceptTask(task.id)}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors'
              >
                Accept Task
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewTask;
