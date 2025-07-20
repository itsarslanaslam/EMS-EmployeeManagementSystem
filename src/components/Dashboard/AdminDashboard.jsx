import React, { useState } from 'react'

// Import child components
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import AdminSettings from './AdminSettings'

// Import styled-components for custom styling
import styled from 'styled-components';

// Main Admin Dashboard component
const AdminDashboard = (props) => {
  // State to keep track of active tab (either "tasks" or "settings")
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className='h-screen w-full p-7'>
      {/* Header bar with logout and user info */}
      <Header changeUser={props.changeUser} data={props.data} />
      
      {/* Tab Navigation Buttons */}
      <div className='flex space-x-1 mb-6'>
        {/* Tasks Tab Button */}
        <button
          onClick={() => setActiveTab('tasks')} // Switch to Task Management tab
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'tasks'
              ? 'bg-[#1c1c1c] text-white' // Active Tab Styling
              : 'bg-[#2a2a2a] text-gray-300 hover:text-white' // Inactive Tab Styling
          }`}
        >
          Task Management
        </button>

        {/* Settings Tab Button with custom animation */}
        <StyledWrapper>
          <button
            onClick={() => setActiveTab('settings')} // Switch to Settings tab
            className="ui-btn"
          >
            <span>Settings</span>
          </button>
        </StyledWrapper>
      </div>

      {/* Tab Content */}
      {/* Render Task Management Components if 'tasks' tab is active */}
      {activeTab === 'tasks' && (
        <>
          <CreateTask /> {/* Form to create new tasks */}
          <AllTask />    {/* List of all existing tasks */}
        </>
      )}
      
      {/* Render Admin Settings Component if 'settings' tab is active */}
      {activeTab === 'settings' && (
        <AdminSettings />
      )}
    </div>
  )
}

export default AdminDashboard

// Styled-component wrapper for animated Settings button
const StyledWrapper = styled.div`
  /* Base button styles using CSS variables */
  .ui-btn {
    --btn-default-bg: rgb(41, 41, 41);
    --btn-padding: 15px 20px;
    --btn-hover-bg: rgb(51, 51, 51);
    --btn-transition: .3s;
    --btn-letter-spacing: .1rem;
    --btn-animation-duration: 1.2s;
    --btn-shadow-color: rgba(0, 0, 0, 0.137);
    --btn-shadow: 0 2px 10px 0 var(--btn-shadow-color);
    --hover-btn-color: #FAC921;
    --default-btn-color: #fff;
    --font-size: 16px;
    --font-weight: 600;
    --font-family: Menlo,Roboto Mono,monospace;
  }

  /* Basic button appearance */
  .ui-btn {
    box-sizing: border-box;
    padding: var(--btn-padding);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--default-btn-color);
    font: var(--font-weight) var(--font-size) var(--font-family);
    background: var(--btn-default-bg);
    border: none;
    cursor: pointer;
    transition: var(--btn-transition);
    overflow: hidden;
    box-shadow: var(--btn-shadow);
  }

  /* Text inside the button */
  .ui-btn span {
    letter-spacing: var(--btn-letter-spacing);
    transition: var(--btn-transition);
    box-sizing: border-box;
    position: relative;
    background: inherit;
  }

  /* Pseudo-element for text animation */
  .ui-btn span::before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    background: inherit;
  }

  /* Hover effects */
  .ui-btn:hover, .ui-btn:focus {
    background: var(--btn-hover-bg);
  }

  /* Change text color and animate on hover */
  .ui-btn:hover span, .ui-btn:focus span {
    color: var(--hover-btn-color);
  }

  /* Run "chitchat" animation on hover */
  .ui-btn:hover span::before, .ui-btn:focus span::before {
    animation: chitchat linear both var(--btn-animation-duration);
  }

  /* Keyframes for the text scramble animation */
  @keyframes chitchat {
    0% { content: "#"; }
    5% { content: "."; }
    10% { content: "^{"; }
    15% { content: "-!"; }
    20% { content: "#$_"; }
    25% { content: "№:0"; }
    30% { content: "#{+."; }
    35% { content: "@}-?"; }
    40% { content: "?{4@%"; }
    45% { content: "=.,^!"; }
    50% { content: "?2@%"; }
    55% { content: "\\;1}]"; }
    60% { content: "?{%:%"; right: 0; }
    65% { content: "|{f[4"; right: 0; }
    70% { content: "{4%0%"; right: 0; }
    75% { content: "'1_0<"; right: 0; }
    80% { content: "{0%"; right: 0; }
    85% { content: "]>'"; right: 0; }
    90% { content: "4"; right: 0; }
    95% { content: "2"; right: 0; }
    100% { content: ""; right: 0; }
  }
`;
