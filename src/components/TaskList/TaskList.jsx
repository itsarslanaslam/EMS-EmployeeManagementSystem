import React, { useState, useMemo } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data, onTaskUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const filteredTasks = useMemo(() => {
    if (!data.tasks) return [];
    
    return data.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'new' && task.newTask) ||
                           (statusFilter === 'active' && task.active) ||
                           (statusFilter === 'completed' && task.completed) ||
                           (statusFilter === 'failed' && task.failed);
      
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [data.tasks, searchTerm, statusFilter, priorityFilter]);

  return (
    <div className='mt-8'>
      <div className='bg-[#1c1c1c] p-5 rounded mb-5 border border-gray-700'>
        <h2 className='text-2xl font-bold text-white mb-4'>Task Management</h2>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400'
          />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='p-2 bg-gray-800 border border-gray-600 rounded text-white'
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
          
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className='p-2 bg-gray-800 border border-gray-600 rounded text-white'
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        
        <div className='text-gray-400 text-sm'>
          Showing {filteredTasks.length} of {data.tasks?.length || 0} tasks
        </div>
      </div>
      
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6'>
        <div className="xl:border-r xl:border-gray-700 xl:pr-6 xl:mr-0 border-b border-gray-700 pb-6 xl:border-b-0 xl:pb-0">
          <NewTask data={data} onTaskUpdate={onTaskUpdate} />
        </div>
        <div className="xl:border-r xl:border-gray-700 xl:pr-6 xl:mr-0 border-b border-gray-700 pb-6 xl:border-b-0 xl:pb-0">
          <AcceptTask data={data} onTaskUpdate={onTaskUpdate} />
        </div>
        <div className="xl:border-r xl:border-gray-700 xl:pr-6 xl:mr-0 border-b border-gray-700 pb-6 xl:border-b-0 xl:pb-0">
          <CompleteTask data={data} onTaskUpdate={onTaskUpdate} />
        </div>
        <div>
          <FailedTask data={data} onTaskUpdate={onTaskUpdate} />
        </div>
      </div>
    </div>
  )
}

export default TaskList