import React from 'react'
import './TaskListNumbers.css'

const TaskListNumbers = ({data}) => {
  const totalTasks = (data.taskcounts?.newTask || 0) + 
                    (data.taskcounts?.active || 0) + 
                    (data.taskcounts?.completed || 0) + 
                    (data.taskcounts?.failed || 0)
  
  const completionRate = totalTasks > 0 ? Math.round(((data.taskcounts?.completed || 0) / totalTasks) * 100) : 0
  const failureRate = totalTasks > 0 ? Math.round(((data.taskcounts?.failed || 0) / totalTasks) * 100) : 0

  return (
    <div className='mt-10'>
      {/* Main Stats */}
      <div className='flex flex-wrap justify-between gap-5 mb-6'>
        <div className='stat-card glass-3d from-red-500 to-red-600'> 
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='stat-number text-red-400'>{data.taskcounts?.newTask || 0}</h2>
              <h3 className='text-xl font-medium text-red-100'>New Tasks</h3>
            </div>
            <div className='text-6xl text-red-200 opacity-50'>📋</div>
          </div>
        </div>

        <div className='stat-card glass-3d from-blue-400 to-blue-500'> 
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='stat-number text-blue-400'>{data.taskcounts?.completed || 0}</h2>
              <h3 className='text-xl font-medium text-blue-100'>Completed</h3>
            </div>
            <div className='text-6xl text-blue-200 opacity-50'>✅</div>
          </div>
        </div>

        <div className='stat-card glass-3d from-green-400 to-green-500'> 
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='stat-number text-green-400'>{data.taskcounts?.active || 0}</h2>
              <h3 className='text-xl font-medium text-green-100'>In Progress</h3>
            </div>
            <div className='text-6xl text-green-200 opacity-50'>🔄</div>
          </div>
        </div>

        <div className='stat-card glass-3d from-yellow-400 to-yellow-500'> 
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='stat-number text-yellow-400'>{data.taskcounts?.failed || 0}</h2>
              <h3 className='text-xl font-medium text-yellow-100'>Failed</h3>
            </div>
            <div className='text-6xl text-yellow-200 opacity-50'>❌</div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Completion Rate */}
        <div className='bg-gray-800 rounded-xl p-6 shadow-lg glass-3d mt-8'>
          <h3 className='text-xl font-semibold text-white mb-4'>Performance Analytics</h3>
          
          <div className='space-y-4'>
            <div>
              <div className='flex justify-between text-sm text-gray-300 mb-2'>
                <span>Completion Rate</span>
                <span>{completionRate}%</span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-3'>
                <div 
                  className='bg-green-500 h-3 rounded-full transition-all duration-500' 
                  style={{width: `${completionRate}%`}}
                ></div>
              </div>
            </div>
            
            <div>
              <div className='flex justify-between text-sm text-gray-300 mb-2'>
                <span>Failure Rate</span>
                <span>{failureRate}%</span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-3'>
                <div 
                  className='bg-red-500 h-3 rounded-full transition-all duration-500' 
                  style={{width: `${failureRate}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className='bg-gray-800 rounded-xl p-6 shadow-lg glass-3d mt-8'>
          <h3 className='text-xl font-semibold text-white mb-4'>Quick Stats</h3>
          
          <div className='space-y-3'>
            <div className='flex justify-between items-center py-2 border-b border-gray-700'>
              <span className='text-gray-300'>Total Tasks</span>
              <span className='text-white font-semibold'>{totalTasks}</span>
            </div>
            
            <div className='flex justify-between items-center py-2 border-b border-gray-700'>
              <span className='text-gray-300'>Active Tasks</span>
              <span className='text-green-400 font-semibold'>{data.taskcounts?.active || 0}</span>
            </div>
            
            <div className='flex justify-between items-center py-2 border-b border-gray-700'>
              <span className='text-gray-300'>Pending Tasks</span>
              <span className='text-yellow-400 font-semibold'>{data.taskcounts?.newTask || 0}</span>
            </div>
            
            <div className='flex justify-between items-center py-2'>
              <span className='text-gray-300'>Success Rate</span>
              <span className='text-blue-400 font-semibold'>{completionRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskListNumbers