const defaultEmployees = [ 
  {
    "id": 1,
    "firstname": "Ahmed",
    "email": "e@e.com",
    "password": "123",
    "taskcounts": {
      "active": 2,
      "completed": 1,
      "newTask": 1,
      "failed": 0
    },
    "tasks": [
      {
        "id": "task_1_1",
        "title": "Design Homepage",
        "description": "Create the homepage layout using Tailwind CSS.",
        "date": "2025-06-24",
        "category": "Design",
        "priority": "medium",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "id": "task_1_2",
        "title": "Fix Login Bug",
        "description": "Resolve user login issue on Safari.",
        "date": "2025-06-20",
        "category": "Bugfix",
        "priority": "high",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "id": "task_1_3",
        "title": "Create Dashboard API",
        "description": "Develop backend API for the admin dashboard.",
        "date": "2025-06-22",
        "category": "Backend",
        "priority": "medium",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      }
    ]
  },
  {
    "id": 2,
    "firstname": "Fatima",
    "email": "employee2@example.com",
    "password": "123",
    "taskcounts": {
      "active": 2,
      "completed": 1,
      "newTask": 1,
      "failed": 1
    },
    "tasks": [
      {
        "id": "task_2_1",
        "title": "Setup Database",
        "description": "Initialize MongoDB for project.",
        "date": "2025-06-18",
        "category": "Database",
        "priority": "high",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "id": "task_2_2",
        "title": "Style Navbar",
        "description": "Add responsive styles to navigation bar.",
        "date": "2025-06-25",
        "category": "Frontend",
        "priority": "medium",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "id": "task_2_3",
        "title": "Write Unit Tests",
        "description": "Cover user registration with tests.",
        "date": "2025-06-23",
        "category": "Testing",
        "priority": "low",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      },
      {
        "id": "task_2_4",
        "title": "Fix Logout Bug",
        "description": "Resolve logout issue in mobile view.",
        "date": "2025-06-22",
        "category": "Bugfix",
        "priority": "high",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ]
  },
  {
    "id": 3,
    "firstname": "Zainab",
    "email": "employee3@example.com",
    "password": "123",
    "taskcounts": {
      "active": 1,
      "completed": 1,
      "newTask": 1,
      "failed": 1
    },
    "tasks": [
      {
        "id": "task_3_1",
        "title": "Create Signup Page",
        "description": "Build and connect signup page to backend.",
        "date": "2025-06-21",
        "category": "Frontend",
        "priority": "medium",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "id": "task_3_2",
        "title": "Optimize Images",
        "description": "Compress large images for faster load.",
        "date": "2025-06-24",
        "category": "Performance",
        "priority": "low",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "id": "task_3_3",
        "title": "Test Mobile View",
        "description": "Ensure all pages work on mobile devices.",
        "date": "2025-06-23",
        "category": "Testing",
        "priority": "high",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ]
  },
  {
    "id": 4,
    "firstname": "Yusuf",
    "email": "employee4@example.com",
    "password": "123",
    "taskcounts": {
      "active": 2,
      "completed": 1,
      "newTask": 1,
      "failed": 1
    },
    "tasks": [
      {
        "id": "task_4_1",
        "title": "Review PR #14",
        "description": "Code review for PR #14 on feature branch.",
        "date": "2025-06-19",
        "category": "Code Review",
        "priority": "medium",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "id": "task_4_2",
        "title": "Refactor Auth Module",
        "description": "Improve structure of authentication module.",
        "date": "2025-06-25",
        "category": "Backend",
        "priority": "high",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "id": "task_4_3",
        "title": "Deploy App",
        "description": "Deploy the latest build to production.",
        "date": "2025-06-24",
        "category": "DevOps",
        "priority": "urgent",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      },
      {
        "id": "task_4_4",
        "title": "Add Dark Mode",
        "description": "Implement dark mode toggle for UI.",
        "date": "2025-06-20",
        "category": "Frontend",
        "priority": "low",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      }
    ]
  },
  {
    "id": 5,
    "firstname": "Ayesha",
    "email": "employee5@example.com",
    "password": "123",
    "taskcounts": {
      "active": 3,
      "completed": 1,
      "newTask": 1,
      "failed": 1
    },
    "tasks": [
      {
        "id": "task_5_1",
        "title": "Clean Console Logs",
        "description": "Remove unnecessary logs in production.",
        "date": "2025-06-18",
        "category": "Cleanup",
        "priority": "low",
        "active": false,
        "newTask": false,
        "completed": true,
        "failed": false
      },
      {
        "id": "task_5_2",
        "title": "Create Notification System",
        "description": "Send real-time alerts on task update.",
        "date": "2025-06-24",
        "category": "Backend",
        "priority": "high",
        "active": true,
        "newTask": true,
        "completed": false,
        "failed": false
      },
      {
        "id": "task_5_3",
        "title": "Add User Avatar",
        "description": "Allow users to upload profile pictures.",
        "date": "2025-06-22",
        "category": "Frontend",
        "priority": "medium",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      },
      {
        "id": "task_5_4",
        "title": "Fix Upload Crash",
        "description": "Fix app crash when uploading large files.",
        "date": "2025-06-21",
        "category": "Bugfix",
        "priority": "urgent",
        "active": false,
        "newTask": false,
        "completed": false,
        "failed": true
      },
      {
        "id": "task_5_5",
        "title": "Update Docs",
        "description": "Update project documentation.",
        "date": "2025-06-23",
        "category": "Documentation",
        "priority": "low",
        "active": true,
        "newTask": false,
        "completed": false,
        "failed": false
      }
    ]
  }
];

export const setLocalStorage = () => {
  localStorage.setItem('employees', JSON.stringify(defaultEmployees));
};

export const resetToDefaultEmployees = () => {
  localStorage.setItem('employees', JSON.stringify(defaultEmployees));
  return defaultEmployees;
};

export const getLocalStorage = () => {
  const storedEmployees = localStorage.getItem('employees');
  let employees;
  
  if (storedEmployees === null) {
    // Only initialize with default employees if localStorage is completely empty
    employees = JSON.parse(JSON.stringify(defaultEmployees)); // Deep copy the default employees
    localStorage.setItem('employees', JSON.stringify(employees));
  } else {
    employees = JSON.parse(storedEmployees);
  }
  
  return { employees };
}; 