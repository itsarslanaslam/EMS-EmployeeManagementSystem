import React, { useEffect, useState } from 'react';

const CreateTask = () => {
  const [employees, setEmployees] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [asignTo, setAsignTo] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [formErrors, setFormErrors] = useState({});
  const [refreshMessage, setRefreshMessage] = useState('');

  const loadEmployees = () => {
    const localEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    console.log('Current localStorage employees:', localEmployees.length);
    console.log('localStorage employee names:', localEmployees.map(emp => emp.firstname || emp.name));
    
    // First, set the employees from localStorage immediately
    setEmployees(localEmployees);
    
    // Then try to fetch from backend and merge
    fetch('http://localhost:5000/api/auth/employees')
      .then(res => {
        if (!res.ok) {
          throw new Error('Backend not available');
        }
        return res.json();
      })
      .then(data => {
        console.log('Backend employees:', data.employees?.length || 0);
        console.log('Backend employee names:', data.employees?.map(emp => emp.name) || []);
        if (data.employees && data.employees.length > 0) {
          const localEmployeeMap = new Map();
          localEmployees.forEach(emp => {
            localEmployeeMap.set(emp.email, emp);
          });
          
          const mergedEmployees = [...localEmployees];
          console.log('Before merging - mergedEmployees count:', mergedEmployees.length);
          
          data.employees.forEach(backendEmp => {
            if (!localEmployeeMap.has(backendEmp.email)) {
              const convertedEmp = {
                id: backendEmp._id,
                firstname: backendEmp.name,
                lastname: '',
                email: backendEmp.email,
                role: backendEmp.role,
                tasks: [],
                taskcounts: { newTask: 0, active: 0, completed: 0, failed: 0 }
              };
              mergedEmployees.push(convertedEmp);
              console.log('Added backend employee:', convertedEmp.firstname);
            }
          });
          
          console.log('After merging - mergedEmployees count:', mergedEmployees.length);
          console.log('Final employee names:', mergedEmployees.map(emp => emp.firstname || emp.name));
          
          // Save the merged employees back to localStorage to persist them
          localStorage.setItem('employees', JSON.stringify(mergedEmployees));
          console.log('Final merged employees:', mergedEmployees.length);
          setEmployees(mergedEmployees);
          setRefreshMessage(`Employee list refreshed! ${mergedEmployees.length} employees available.`);
          setTimeout(() => setRefreshMessage(''), 3000);
        } else {
          setRefreshMessage(`Employee list refreshed! ${localEmployees.length} employees available.`);
          setTimeout(() => setRefreshMessage(''), 3000);
        }
      })
      .catch(err => {
        console.error('Error fetching employees:', err);
        console.log('Using localStorage employees only:', localEmployees.length);
        setRefreshMessage(`Employee list refreshed! ${localEmployees.length} employees available.`);
        setTimeout(() => setRefreshMessage(''), 3000);
      });
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!taskTitle.trim()) errors.taskTitle = 'Task title is required';
    if (!taskDescription.trim()) errors.taskDescription = 'Task description is required';
    if (!taskDate) errors.taskDate = 'Due date is required';
    if (!asignTo) errors.asignTo = 'Please select an employee';
    if (!category.trim()) errors.category = 'Category is required';
    
    if (taskDate && new Date(taskDate) < new Date().setHours(0,0,0,0)) {
      errors.taskDate = 'Due date cannot be in the past';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const task = {
      title: taskTitle, 
      asignTo, 
      date: taskDate, 
      description: taskDescription, 
      category, 
      priority,
      active: false, 
      newTask: true, 
      failed: false, 
      completed: false,
      createdAt: new Date().toISOString(),
      id: Date.now() + Math.random()
    };

    const updatedEmployees = employees.map(employee => {
      if (asignTo === employee.firstname) {
        if (!employee.tasks) employee.tasks = [];
        employee.tasks.push(task);
        if (!employee.taskcounts) {
          employee.taskcounts = { newTask: 0, active: 0, completed: 0, failed: 0 };
        }
        employee.taskcounts.newTask = employee.taskcounts.newTask + 1;
      }
      return employee;
    });
    
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
    setAsignTo('');
    setCategory('');
    setPriority('medium');
    setFormErrors({});

    alert('Task created successfully!');
  };

  return (
    <div className='p-5 bg-[#1c1c1c] mt-5 rounded shadow-lg'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-white'>Create New Task</h2>
        <div className='flex items-center gap-3'>
          {refreshMessage && (
            <p className='text-green-400 text-sm'>{refreshMessage}</p>
          )}
          <button 
            onClick={loadEmployees}
            className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm transition-colors font-medium'
          >
            Refresh Employee List
          </button>
        </div>
      </div>
      <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between'>
        <div className='w-1/2'>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Task Title *</h3>
            <input 
              value={taskTitle} 
              onChange={(e) => {
                setTaskTitle(e.target.value);
                if (formErrors.taskTitle) setFormErrors({...formErrors, taskTitle: ''});
              }}
              className={`text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border-[1px] mb-1 ${
                formErrors.taskTitle ? 'border-red-500' : 'border-gray-400'
              } focus:border-blue-500 transition-colors`} 
              type="text" 
              placeholder='Make a UI design' 
            />
            {formErrors.taskTitle && <p className='text-red-400 text-xs mb-3'>{formErrors.taskTitle}</p>}
          </div>

          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Due Date *</h3>
            <input 
              value={taskDate} 
              onChange={(e) => {
                setTaskDate(e.target.value);
                if (formErrors.taskDate) setFormErrors({...formErrors, taskDate: ''});
              }}
              className={`text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border-[1px] mb-1 ${
                formErrors.taskDate ? 'border-red-500' : 'border-gray-400'
              } focus:border-blue-500 transition-colors`} 
              type="date"
            />
            {formErrors.taskDate && <p className='text-red-400 text-xs mb-3'>{formErrors.taskDate}</p>}
          </div>

          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Assign to * ({employees.length} employees available)</h3>
            <div>
              <select 
                value={asignTo} 
                onChange={(e) => {
                  setAsignTo(e.target.value);
                  if (formErrors.asignTo) setFormErrors({...formErrors, asignTo: ''});
                }}
                className={`text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border-[1px] mb-1 ${
                  formErrors.asignTo ? 'border-red-500' : 'border-gray-400'
                } focus:border-blue-500 transition-colors`}
              >
                <option className='text-black' value="">Select Employee</option>
                {employees.map((employee) => {
                  console.log('Employee in dropdown:', employee);
                  const employeeName = employee.firstname || employee.name || 'Unknown';
                  const employeeValue = employee.firstname || employee.name || 'Unknown';
                  console.log('Employee name:', employeeName, 'Employee value:', employeeValue);
                  return (
                    <option className='text-black' key={employee.id || employee._id} value={employeeValue}>
                      {employeeName}
                    </option>
                  );
                })}
              </select>
              {formErrors.asignTo && <p className='text-red-400 text-xs mb-3'>{formErrors.asignTo}</p>}
            </div>
          </div>

          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Priority</h3>
            <div>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className='text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 focus:border-blue-500 transition-colors'
              >
                <option className='text-black' value="low">Low</option>
                <option className='text-black' value="medium">Medium</option>
                <option className='text-black' value="high">High</option>
                <option className='text-black' value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Category *</h3>
            <input 
              value={category} 
              onChange={(e) => {
                setCategory(e.target.value);
                if (formErrors.category) setFormErrors({...formErrors, category: ''});
              }}
              className={`text-sm py-2 px-3 w-4/5 rounded outline-none bg-transparent border-[1px] mb-1 ${
                formErrors.category ? 'border-red-500' : 'border-gray-400'
              } focus:border-blue-500 transition-colors`} 
              type="text" 
              placeholder='Design, Dev, Testing, etc.'
            />
            {formErrors.category && <p className='text-red-400 text-xs mb-3'>{formErrors.category}</p>}
          </div>
        </div>

        <div className='w-2/5 flex flex-col items-start'>
          <h3 className='text-sm text-gray-300 mb-0.5'>Description *</h3>
          <textarea
            value={taskDescription} 
            onChange={(e) => {
              setTaskDescription(e.target.value);
              if (formErrors.taskDescription) setFormErrors({...formErrors, taskDescription: ''});
            }}
            className={`w-full h-44 text-sm py-2 px-3 rounded outline-none bg-transparent border-[1px] mb-1 resize-none ${
              formErrors.taskDescription ? 'border-red-500' : 'border-gray-400'
            } focus:border-blue-500 transition-colors`} 
            placeholder='Describe the task in detail...'
          />
          {formErrors.taskDescription && <p className='text-red-400 text-xs mb-3'>{formErrors.taskDescription}</p>}
          <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full transition-colors font-medium'>Create Task</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;