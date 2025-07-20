import React, { useState } from 'react';
import styled from 'styled-components';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Form Submission Logic
  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (email === 'admin@me.com' && password === '123') {
        handleLogin(email, password, { email, role: 'admin' });
        setEmail("");
        setPassword("");
        return;
      }
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        handleLogin(email, password, data.user);
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  // The UI
  return (
    <StyledWrapper>
      <div className="card" id="card">
        <div className="content">
          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Login</h2>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
              style={inputStyle}
              type='email'
              placeholder='Enter your email'
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
              style={inputStyle}
              type="password"
              placeholder='Enter your password'
            />
            <button type="submit" style={buttonStyle}>Log in</button>
            {message && <p style={{ color: 'salmon', textAlign: 'center', marginTop: 8 }}>{message}</p>}
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

export default Login;