import React, { useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import Signup from './components/Auth/Signup';

const App = () => {
const [user, setUser] = useState(null)
const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [showSignup, setShowSignup] = useState(false);

  // Check if user already logged in (on page load)
  useEffect(() => {
const loggedInUser = localStorage.getItem("loggedInUser")
    if (loggedInUser) {
const userData = JSON.parse(loggedInUser)
setUser(userData.role)
setLoggedInUserData(userData.data)
  }
}, [])

// handleLogin function
  const handleLogin = (email, password, backendUser) => {
    if (email === 'admin@me.com' && password === '123') {
      const adminData = { firstname: "Admin", lastname: "", email: "admin@me.com", role: 'admin' };
      setUser('admin');
      setLoggedInUserData(adminData);
      localStorage.setItem('loggedInUser', JSON.stringify({ role: "admin", data: adminData }));
    } else if (backendUser) {
      const userRole = backendUser.role || 'employee';
      setUser(userRole);
      setLoggedInUserData({ ...backendUser, role: userRole });
      localStorage.setItem('loggedInUser', JSON.stringify({ role: userRole, data: { ...backendUser, role: userRole } }));
    } else {
      alert('Invalid Credentials');
  }
  };

  return (
    <>
    {/* Role base Login */}
    {!user ? (
        showSignup ? (
          <>
            <Signup />
        
            <p className='text-center'>Already have an account? <button onClick={() => setShowSignup(false)}>Login</button></p>
          </>
        ) : (
          <>
      <Login handleLogin={handleLogin} />
            <p className='text-center mt-1'>Don't have an account? <button onClick={() => setShowSignup(true)}>Sign Up</button></p>
          </>
        )
    ) : (
        user === 'admin' ? <AdminDashboard changeUser={setUser} data={loggedInUserData} /> : (user === "employee" ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null)
    )}
    </>
  )
}

export default App