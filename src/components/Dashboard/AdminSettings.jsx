import React, { useState, useEffect } from 'react';

// AdminSettings component manages employee data in localStorage
const AdminSettings = () => {
  // State to hold employees list
  const [employees, setEmployees] = useState([]);
  // State to hold success/error messages for user feedback
  const [message, setMessage] = useState('');

  // Load employees from localStorage when component mounts
  useEffect(() => {
    loadEmployees();
  }, []);

  // Load employees from localStorage
  const loadEmployees = () => {
    const localEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    setEmployees(localEmployees);
  };

  // Checks if certain "expected" employees exist in localStorage
  const checkAndFixEmployees = () => {
    const currentEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    console.log('Current employees in localStorage:', currentEmployees);

    const expectedEmployees = ['Ahmed', 'Fatima', 'Zainab', 'Yusuf', 'Ayesha', 'Ezio', 'Fisher'];
    const currentNames = currentEmployees.map(emp => emp.firstname || emp.name);

    const missingEmployees = expectedEmployees.filter(name => !currentNames.includes(name));
    console.log('Missing employees:', missingEmployees);

    if (missingEmployees.length > 0) {
      setMessage(`Missing employees: ${missingEmployees.join(', ')}`);
    } else {
      setMessage('All expected employees are present!');
    }

    // Clear message after 5 seconds
    setTimeout(() => setMessage(''), 5000);
  };

  // Adds missing predefined employees (Ezio & Fisher) into localStorage
  const addMissingEmployees = () => {
    const currentEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const currentNames = currentEmployees.map(emp => emp.firstname || emp.name);
    const missingEmployees = [];

    if (!currentNames.includes('Ezio')) {
      missingEmployees.push({
        id: Date.now() + 1,
        firstname: 'Ezio',
        email: 'ezio@example.com',
        password: '123',
        role: 'employee',
        tasks: [],
        taskcounts: { newTask: 0, active: 0, completed: 0, failed: 0 }
      });
    }

    if (!currentNames.includes('Fisher')) {
      missingEmployees.push({
        id: Date.now() + 2,
        firstname: 'Fisher',
        email: 'fisher@example.com',
        password: '123',
        role: 'employee',
        tasks: [],
        taskcounts: { newTask: 0, active: 0, completed: 0, failed: 0 }
      });
    }

    if (missingEmployees.length > 0) {
      const updatedEmployees = [...currentEmployees, ...missingEmployees];
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
      setMessage(`Added missing employees: ${missingEmployees.map(emp => emp.firstname).join(', ')}`);
      console.log('Updated employees:', updatedEmployees);
    } else {
      setMessage('No missing employees to add!');
    }

    setTimeout(() => setMessage(''), 5000);
  };

  // Resets all employees to a default set (from a utility function)
  const resetToDefaultEmployees = () => {
    if (window.confirm('Are you sure you want to reset to default employees? This will remove all custom employees.')) {
      const { resetToDefaultEmployees } = require('../../utils/localStorage');
      const defaultEmployees = resetToDefaultEmployees();
      setEmployees(defaultEmployees);
      setMessage('Reset to default employees successfully!');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  // Clears all employees from localStorage
  const clearAllEmployees = () => {
    if (window.confirm('Are you sure you want to clear all employees? This action cannot be undone.')) {
      localStorage.setItem('employees', JSON.stringify([]));
      setEmployees([]);
      setMessage('All employees cleared!');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  // Logs employee data to the console for debugging purposes
  const debugEmployeeData = () => {
    const currentEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    console.log('Current employee count:', currentEmployees.length);
    console.log('All employees:', currentEmployees);
    setMessage(`Current employee count: ${currentEmployees.length}. Check console for detailed info.`);
    setTimeout(() => setMessage(''), 5000);
  };

  // Fixes tasks without IDs by assigning new unique IDs
  const fixTaskIds = () => {
    const currentEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    let fixedCount = 0;

    const updatedEmployees = currentEmployees.map(emp => {
      if (emp.tasks && emp.tasks.length > 0) {
        const updatedTasks = emp.tasks.map((task, index) => {
          if (!task.id) {
            fixedCount++;
            return {
              ...task,
              id: `task_${emp.id || emp._id || Date.now()}_${index + 1}`,
              priority: task.priority || 'medium'
            };
          }
          return task;
        });
        return { ...emp, tasks: updatedTasks };
      }
      return emp;
    });

    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    setMessage(`Fixed ${fixedCount} tasks with missing IDs!`);
    setTimeout(() => setMessage(''), 5000);
  };

  // UI Rendering
  return (
    <div className='p-5 bg-[#1c1c1c] mt-5 rounded shadow-lg'>
      {/* Title */}
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-white'>Admin Settings</h2>
      </div>

      {/* Display success/error messages */}
      {message && (
        <div className={`p-3 rounded mb-4 ${
          message.includes('error') || message.includes('Missing') 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          {message}
        </div>
      )}

      {/* Two main sections: Employee Management & System Management */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Employee Management Section */}
        <div className='bg-[#2a2a2a] p-4 rounded'>
          <h3 className='text-lg font-semibold text-white mb-4'>Employee Management</h3>
          
          <div className='space-y-3'>
            {/* Total employee count */}
            <div className='flex justify-between items-center'>
              <span className='text-gray-300'>Total Employees:</span>
              <span className='text-white font-semibold'>{employees.length}</span>
            </div>

            {/* Action Buttons */}
            <button onClick={checkAndFixEmployees} className='w-full bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-sm transition-colors font-medium'>
              Check Missing Employees
            </button>

            <button onClick={addMissingEmployees} className='w-full bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-sm transition-colors font-medium'>
              Add Missing Employees
            </button>

            <button onClick={debugEmployeeData} className='w-full bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-sm transition-colors font-medium'>
              Debug Employee Data
            </button>
          </div>
        </div>

        {/* System Management Section */}
        <div className='bg-[#2a2a2a] p-4 rounded'>
          <h3 className='text-lg font-semibold text-white mb-4'>System Management</h3>
          
          <div className='space-y-3'>
            <button onClick={resetToDefaultEmployees} className='w-full bg-orange-500 mt-2.5 hover:bg-orange-600 px-4 py-2 rounded text-sm transition-colors font-medium'>
              Reset to Default Employees
            </button>

            <button onClick={fixTaskIds} className='w-full bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm transition-colors font-medium'>
              Fix Task IDs
            </button>

            <button onClick={clearAllEmployees} className='w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm transition-colors font-medium'>
              Clear All Employees
            </button>

            <button onClick={loadEmployees} className='w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm transition-colors font-medium'>
              Refresh Employee List
            </button>
          </div>
        </div>
      </div>

      {/* Current Employee List */}
      <div className='mt-6 bg-[#2a2a2a] p-4 rounded'>
        <h3 className='text-lg font-semibold text-white mb-4'>Current Employees:</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {employees.map((employee) => (
            <div key={employee.id || employee._id} className='bg-[#3a3a3a] p-3 rounded'>
              <div className='text-white font-medium'>{employee.firstname || employee.name}</div>
              <div className='text-gray-400 text-sm'>{employee.email}</div>
              <div className='text-gray-400 text-sm'>Role: {employee.role || 'employee'}</div>
              {employee.tasks && (
                <div className='text-gray-400 text-sm'>
                  Tasks: {employee.tasks.length}
                </div>
              )}
            </div>
          ))}
        </div>
        {employees.length === 0 && (
          <p className='text-gray-400 text-center py-4'>No employees found</p>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
