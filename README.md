# Business Card Manager (React Project)

## 🔍 Overview

This is a digital business card application built with React. It allows users to create, view, manage, and share virtual business cards. The system supports different user types: regular users, business users, and admin users — each with different access and functionality.

---

## 🎯 Features

- User authentication with protected routes
- Business users can:
  - Create, edit, and delete their own cards
  - View only their cards
- Regular users can:
  - View and favorite cards
- Admin users can:
  - Access all cards
  - View the CRM page with all users
  - Change user statuses (business/regular)
  - Delete any non-admin user
- Responsive design with dark/light mode toggle
- Dynamic search bar
- User profile update functionality

---

## 🧠 Technologies Used

- React + Vite
- React Router DOM
- Axios
- Formik + Joi for validation
- Bootstrap 5 for styling
- React Icons
- JSON Server for simulating backend
- React Toastify for notifications

---

## 🔐 User Types and Permissions

| Type      | Permissions                                |
|-----------|--------------------------------------------|
| Guest     | View public pages and sign up / sign in    |
| Regular   | View and favorite cards                    |
| Business  | Full card CRUD (Create, Read, Update, Delete) |
| Admin     | CRM access, user management, full card access |

---

---

## 🧪 Running the App

1. Clone the repository:
git clone https://github.com/lenane68/Business-Cards-React-Project.git cd Business-Cards-React-Project

2. Install dependencies:
   npm install
   npm install react-toastify
   npm install formik
   npm install formik joi react-router-dom react-toastify axios bootstrap react-icons
   npm install react-hook-form
   npm install @hookform/resolvers yup

3. Start JSON Server (mock backend):
   npx json-server --watch db.json --port 3900
   
Run the React app:
npm run dev


---

## 🔗 Links

- **GitHub Repository:** [https://github.com/lenane68/Business-Cards-React-Project](https://github.com/lenane68/Business-Cards-React-Project)

---

## 👤 Author

- Lena Dabbah  
- Built as part of a React hands-on learning module (2025)

---

