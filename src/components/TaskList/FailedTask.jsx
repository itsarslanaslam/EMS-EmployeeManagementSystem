import React from 'react'

const FailedTask = ({ data, onTaskUpdate }) => {
  const failedTasks = data.tasks?.filter(task => task.failed) || [];

  const handleRetryTask = (taskId) => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const updatedEmployees = employees.map(emp => {
      if (emp.email === data.email) {
        const updatedTasks = emp.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, failed: false, active: true };
          }
          return task;
        });
        
        const updatedTaskCounts = {
          newTask: emp.taskcounts?.newTask || 0,
          active: (emp.taskcounts?.active || 0) + 1,
          completed: emp.taskcounts?.completed || 0,
          failed: Math.max(0, (emp.taskcounts?.failed || 0) - 1)
        };
        
        return { ...emp, tasks: updatedTasks, taskcounts: updatedTaskCounts };
      }
      return emp;
    });
    
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    onTaskUpdate();
  };

  const handleRemoveTask = (taskId) => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const updatedEmployees = employees.map(emp => {
      if (emp.email === data.email) {
        const updatedTasks = emp.tasks.filter(task => task.id !== taskId);
        
        const updatedTaskCounts = {
          newTask: emp.taskcounts?.newTask || 0,
          active: emp.taskcounts?.active || 0,
          completed: emp.taskcounts?.completed || 0,
          failed: Math.max(0, (emp.taskcounts?.failed || 0) - 1)
        };
        
        return { ...emp, tasks: updatedTasks, taskcounts: updatedTaskCounts };
      }
      return emp;
    });
    
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    onTaskUpdate();
  };

  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
      <h2 className='text-2xl font-bold text-white mb-4'>Failed Tasks</h2>
      <div className='space-y-4'>
        {failedTasks.length === 0 ? (
          <p className='text-gray-400 text-center py-4'>No failed tasks</p>
        ) : (
          failedTasks.map((task) => (
            <div key={task.id} className='bg-gradient-to-br from-red-900/50 to-orange-800/30 border border-red-400/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm relative overflow-hidden'>
              {/* Background pattern */}
              <div className='absolute inset-0 bg-gradient-to-br from-red-400/5 to-transparent'></div>
              
              <div className='relative z-10'>
                <div className='flex justify-between items-start mb-4'>
                  <h3 className='text-lg font-bold text-white pr-4'>{task.title}</h3>
                  <div className='flex items-center gap-3'>
                    <span className='px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-400/30'>
                      {task.priority}
                    </span>
                    <button
                      onClick={() => handleRemoveTask(task.id)}
                      className='w-7 h-7 bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-white border border-red-400/30 hover:border-red-400/50 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 hover:scale-110'
                      title='Remove Task'
                    >
                      ×
                    </button>
                  </div>
                </div>
                
                <p className='text-gray-200 mb-4 leading-relaxed'>{task.description}</p>
                
                <div className='flex justify-between items-center text-sm text-gray-300 mb-4'>
                  <span className='flex items-center gap-1'>
                    <span className='w-2 h-2 bg-red-400 rounded-full'></span>
                    {task.category}
                  </span>
                  <span className='flex items-center gap-1'>
                    <span className='text-red-400'>📅</span>
                    {task.date}
                  </span>
                </div>
                
                <button
                  onClick={() => handleRetryTask(task.id)}
                  className='w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                >
                  🔄 Retry Task
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FailedTask;