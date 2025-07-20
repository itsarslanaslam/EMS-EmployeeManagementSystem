import React, { useState } from 'react';
import styled from 'styled-components';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

// Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        // Also save to localStorage for immediate availability
        if (form.role === 'employee') {
          const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
          const newEmployee = {
            id: data.user?._id || Date.now(),
            firstname: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
            tasks: [],
            taskcounts: { newTask: 0, active: 0, completed: 0, failed: 0 }
          };
          
          // Check if employee already exists
          const exists = existingEmployees.some(emp => emp.email === form.email);
          if (!exists) {
            existingEmployees.push(newEmployee);
            localStorage.setItem('employees', JSON.stringify(existingEmployees));
          }
        }
        
        setMessage('Signup successful!');
        setForm({ name: '', email: '', password: '', role: 'employee' });
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

// UI Rendering
  return (
    <StyledWrapper>
      <div className="card" id="card">
        <div className="content">
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Signup</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <select name="role" value={form.role} onChange={handleChange} required style={inputStyle}>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" style={buttonStyle}>Sign Up</button>
            {message && <p style={{ color: message.includes('success') ? 'lightgreen' : 'salmon', textAlign: 'center', marginTop: 8 }}>{message}</p>}
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  margin: '6px 0',
  borderRadius: '4px',
  border: '1px solid #444',
  background: '#222',
  color: 'white',
  fontSize: '1em',
  boxSizing: 'border-box',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  margin: '12px 0 0 0',
  borderRadius: '4px',
  border: 'none',
  background: 'linear-gradient(90deg, #ff2288, #387ef0)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1em',
  cursor: 'pointer',
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  .card {
    width: 320px;
    height: 420px;
    background: #171717;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 0px 3px 1px #00000088;
    cursor: pointer;
  }
  .card .content {
    border-radius: 5px;
    background: #171717;
    width: 316px;
    height: 416px;
    z-index: 1;
    padding: 24px 20px 20px 20px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .content::before {
    opacity: 0;
    transition: opacity 300ms;
    content: " ";
    display: block;
    background: white;
    width: 5px;
    height: 50px;
    position: absolute;
    filter: blur(50px);
    overflow: hidden;
  }
  .card:hover .content::before {
    opacity: 1;
  }
  .card::before {
    opacity: 0;
    content: " ";
    position: absolute;
    display: block;
    width: 80px;
    height: 360px;
    background: linear-gradient(#ff2288, #387ef0);
    transition: opacity 300ms;
    animation: rotation_9018 8000ms infinite linear;
    animation-play-state: paused;
  }
  .card:hover::before {
    opacity: 1;
    animation-play-state: running;
  }
  .card::after {
    position: absolute;
    content: " ";
    display: block;
    width: 350px;
    height: 460px;
    background: #17171733;
    backdrop-filter: blur(50px);
  }
  @keyframes rotation_9018 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Signup; 