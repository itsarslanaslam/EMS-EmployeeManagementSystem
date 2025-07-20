import React, { useState, useEffect } from 'react'

const AllTask = () => {
  const [employees, setEmployees] = useState([])
  const [lastUpdated, setLastUpdated] = useState('')

  const loadEmployees = () => {
    const localEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    
    fetch('http://localhost:5000/api/auth/employees')
      .then(res => res.json())
      .then(data => {
        if (data.employees && data.employees.length > 0) {
          const localEmployeeMap = new Map();
          localEmployees.forEach(emp => {
            localEmployeeMap.set(emp.email, emp);
          });
          
          const mergedEmployees = [...localEmployees];
          
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
            }
          });
          
          setEmployees(mergedEmployees);
          setLastUpdated(new Date().toLocaleTimeString());
        } else {
          setEmployees(localEmployees);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      })
      .catch(err => {
        console.error('Error fetching employees:', err);
        setEmployees(localEmployees);
        setLastUpdated(new Date().toLocaleTimeString());
      });
  };

  useEffect(() => {
    loadEmployees();

    const handleStorageChange = () => {
      loadEmployees();
    };

    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(loadEmployees, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const totals = employees.reduce((acc, emp) => {
    acc.newTask += emp.taskcounts?.newTask || 0;
    acc.active += emp.taskcounts?.active || 0;
    acc.completed += emp.taskcounts?.completed || 0;
    acc.failed += emp.taskcounts?.failed || 0;
    return acc;
  }, { newTask: 0, active: 0, completed: 0, failed: 0 });

  return (
    <div className='bg-[#1c1c1c] p-8 rounded-xl mt-5 shadow-lg'>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4'>
        <div>
          <h2 className='text-3xl font-extrabold text-white mb-1 tracking-tight'>Employee Task Overview</h2>
          {lastUpdated && (
            <p className='text-gray-400 text-xs'>Last updated: {lastUpdated}</p>
          )}
        </div>
        <button 
          onClick={loadEmployees}
          className='bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-6 py-2 rounded-lg text-sm font-semibold text-white shadow transition-all duration-200'
        >
          Refresh Data
        </button>
      </div>
      
      <div className='bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-3 mb-4 shadow'>
        <h3 className='text-lg font-bold text-white mb-2'>Summary</h3>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
          <div className='text-center'>
            <p className='text-gray-400 text-xs mb-0.5'>Total Employees</p>
            <p className='text-white text-lg font-extrabold'>{employees.length}</p>
          </div>
          <div className='text-center'>
            <p className='text-gray-400 text-xs mb-0.5'>Total New Tasks</p>
            <p className='text-red-400 text-lg font-extrabold'>{totals.newTask}</p>
          </div>
          <div className='text-center'>
            <p className='text-gray-400 text-xs mb-0.5'>Total Active Tasks</p>
            <p className='text-yellow-400 text-lg font-extrabold'>{totals.active}</p>
          </div>
          <div className='text-center'>
            <p className='text-gray-400 text-xs mb-0.5'>Total Completed</p>
            <p className='text-green-400 text-lg font-extrabold'>{totals.completed}</p>
          </div>
          <div className='text-center'>
            <p className='text-gray-400 text-xs mb-0.5'>Total Failed</p>
            <p className='text-amber-400 text-lg font-extrabold'>{totals.failed}</p>
          </div>
        </div>
      </div>
      
      <div className='bg-purple-950 border-2 border-fuchsia-500 mb-4 py-3 px-6 flex justify-between rounded-lg shadow'>
        <h2 className='w-1/5 font-semibold text-white text-base'>Employee Name</h2>
        <h3 className='w-1/5 font-semibold text-white text-base text-center'>New Task</h3>
        <h5 className='w-1/5 font-semibold text-white text-base text-center'>Active Task</h5>
        <h5 className='w-1/5 font-semibold text-white text-base text-center'>Completed</h5>
        <h5 className='w-1/5 font-semibold text-white text-base text-center'>Failed</h5>
      </div>

      {/* Employee List - no scroll, modern card look */}
      <div className='flex flex-col gap-3'>
        {employees.length === 0 ? (
          <div className='text-center py-8 text-gray-400'>
            <p>No employees found. Please add employees to see task data.</p>
          </div>
        ) : (
          employees.map((elem, idx) => (
            <div
              key={elem.id || elem._id || idx}
              className='bg-gradient-to-r from-blue-950 to-blue-900 border-2 border-blue-500 py-4 px-6 flex justify-between items-center rounded-lg shadow hover:scale-[1.01] hover:shadow-xl transition-transform duration-200'
            >
              <h2 className='w-1/5 font-semibold text-white'>{elem.firstname || elem.name}</h2>
              <h3 className='w-1/5 text-red-400 font-bold text-center'>{elem.taskcounts?.newTask || 0}</h3>
              <h5 className='w-1/5 text-yellow-300 font-bold text-center'>{elem.taskcounts?.active || 0}</h5>
              <h5 className='w-1/5 text-green-400 font-bold text-center'>{elem.taskcounts?.completed || 0}</h5>
              <h5 className='w-1/5 text-amber-400 font-bold text-center'>{elem.taskcounts?.failed || 0}</h5>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AllTask