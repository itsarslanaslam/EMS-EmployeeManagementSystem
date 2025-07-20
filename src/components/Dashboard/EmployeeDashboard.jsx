import React, { useEffect, useState } from 'react'

// Import reusable components
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import ThreeBackground from '../other/ThreeBackground' // NEW: 3D background animation

// EmployeeDashboard component displays employee-specific tasks and settings
const EmployeeDashboard = (props) => {
  // State to hold current user’s up-to-date data
  const [currentUserData, setCurrentUserData] = useState(props.data)

  // Effect runs on mount and when props.data changes
  useEffect(() => {
    // Load all employees from localStorage
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');

    // Find the logged-in employee by email
    const updatedUser = employees.find(emp => emp.email === props.data.email);

    if (updatedUser) {
      // Update state with the latest data from localStorage
      setCurrentUserData(updatedUser);
      // Also update 'loggedInUser' in localStorage for persistence
      localStorage.setItem('loggedInUser', JSON.stringify({ role: "employee", data: updatedUser }));
    } else {
      // If employee not found in localStorage, fallback to props.data
      setCurrentUserData(props.data);
    }
  }, [props.data.email, props.data]); // Dependency array ensures it runs when email or props.data changes

  // Called after task updates (refreshes the user data)
  const handleTaskUpdate = (updatedUserData) => {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const updatedUser = employees.find(emp => emp.email === props.data.email);

    if (updatedUser) {
      setCurrentUserData(updatedUser);
      localStorage.setItem('loggedInUser', JSON.stringify({ role: "employee", data: updatedUser }));
    } else {
      setCurrentUserData(props.data);
    }
  }

  // Exports employee's tasks to a downloadable JSON file
  const exportTasks = () => {
    const employeeName = currentUserData.firstname || currentUserData.name || 'Employee';

    // Build the JSON structure
    const tasksData = {
      employee: employeeName,
      exportDate: new Date().toISOString(),
      tasks: currentUserData.tasks || [],
      summary: {
        total: (currentUserData.taskcounts?.newTask || 0)
             + (currentUserData.taskcounts?.active || 0)
             + (currentUserData.taskcounts?.completed || 0)
             + (currentUserData.taskcounts?.failed || 0),
        new: currentUserData.taskcounts?.newTask || 0,
        active: currentUserData.taskcounts?.active || 0,
        completed: currentUserData.taskcounts?.completed || 0,
        failed: currentUserData.taskcounts?.failed || 0
      }
    }

    // Convert data to JSON string
    const dataStr = JSON.stringify(tasksData, null, 2)
    // Create a Blob object for file download
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(dataBlob)

    // Create a hidden anchor element and click it to start download
    const link = document.createElement('a')
    link.href = url
    link.download = `${employeeName}_tasks_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url) // Cleanup the temporary URL
  }

  // Render the dashboard UI
  return (
    <div className='relative min-h-screen overflow-hidden'>
      {/* Background animation */}
      <ThreeBackground /> 

      {/* Foreground content */}
      <div className='relative z-10 p-10 bg-[#1C1C1C] bg-opacity-90 h-full min-h-screen'>
        {/* Top Header */}
        <Header changeUser={props.changeUser} data={currentUserData} />

        {/* Export Button */}
        <div className='mt-6 flex justify-end'>
          <button
            onClick={exportTasks}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 shadow-lg backdrop-blur-md'
          >
            📊 Export Tasks
          </button>
        </div>

        {/* Task summary numbers (New, Active, Completed, Failed) */}
        <TaskListNumbers data={currentUserData} />

        {/* Detailed task list */}
        <TaskList data={currentUserData} onTaskUpdate={handleTaskUpdate} />
      </div>
    </div>
  )
}

// Export component
export default EmployeeDashboard
