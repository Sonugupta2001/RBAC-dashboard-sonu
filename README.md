# **RBAC Dashboard**

The **RBAC Dashboard** is a user management interface designed to manage **users**, **roles**, and **permissions** in a **Role-Based Access Control (RBAC)** system. It uses a simple mock backend with **JSON Server** to mimic a REST API that handles CRUD operations for users, roles, and permissions. The frontend of the project is built using **React**, and it communicates with the backend to manage data.

---

## **Project Overview**

This project allows the management of users, roles, and permissions within an RBAC framework, allowing easy management of access control in a software system. The app mimics a backend using **json-server**, and the user interface is built with **React**. 

- **User Management**: Add, edit, delete, and filter users.
- **Role Management**: Manage roles such as Admin, Editor, Viewer, etc.
- **Permissions**: Simulate permissions assigned to roles.
- **Searching and Filtering**: Search users by name, email, or role.
  
### **How it Works**
1. The **frontend** uses React for creating the dashboard interface.
2. **json-server** simulates the backend by reading and writing data from a `db.json` file.
3. The frontend communicates with the mock API using RESTful HTTP requests to manage users, roles, and permissions.

---

## **Features**
- **User CRUD**: Create, read, update, and delete users.
- **Role CRUD**: Define and manage roles.
- **Permissions**: Simulate permissions for roles.
- **Search and Filter**: Search for users based on name, email, or role.
- **Responsive**: The application is responsive and can be accessed from any device.

---

## **Prerequisites**

Before setting up the project, ensure that you have the following installed:

- **Node.js** (v16 or above)
- **npm** or **yarn** (for managing dependencies)
- **json-server** (for mocking the backend API)

You can download Node.js and npm from [here](https://nodejs.org/), and install json-server globally using the following command:

```bash
npm install -g json-server
```

Setup Instructions
1. Clone the repository
First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd rbac-dashboard
```
2. Install dependencies
Install the required dependencies for the project using npm:

```bash
npm install
```
This will install the required React dependencies as well as any other packages needed to run the application.

3. Start the JSON server
json-server simulates a backend API for this project. Ensure that the db.json file is present in the root of your project directory.

Start the JSON Server by running the following command:

```bash
json-server db.json --port 5001
```
This will start a mock API that listens on port 5001.

4. Start the React application
In a new terminal window, navigate to the project directory and run the following command to start the React application:

```bash
npm start
```
This will start the React development server, and you can view the application by navigating to http://localhost:3000 in your web browser.


The JSON Server runs on port 5001 and exposes the following endpoints for interaction:
1. Users
GET /users: Retrieves a list of all users.
POST /users: Creates a new user.
PUT /users/:id: Updates a user by their ID.
DELETE /users/:id: Deletes a user by their ID.
2. Roles
GET /roles: Retrieves a list of all roles.
3. Permissions
GET /permissions: Retrieves a list of all permissions.


Example of a db.json file:

```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "Admin",
      "status": "Active"
    }
  ],
  "roles": [
    { "id": 1, "name": "Admin" },
    { "id": 2, "name": "Editor" },
    { "id": 3, "name": "Viewer" }
  ],
  "permissions": [
    { "id": 1, "name": "Read" },
    { "id": 2, "name": "Write" },
    { "id": 3, "name": "Execute" }
  ]
}
```

### Running the Application

Frontend (React Application)
Run the React application:

```bash
npm start
```
This will start the application on http://localhost:3000.

User Interface: You can now manage users, roles, and permissions through the web interface.

Add/Edit Users: Navigate to the User Management page and add or edit users.
Filter/Search Users: Use the search bar to filter users by name, email, or role.
Backend (JSON Server)
Run the JSON Server:

```bash
json-server db.json --port 5001
```
The mock API is now available at http://localhost:5001 and will provide data for users, roles, and permissions.

Components Explained
1. UserManagement.js
This component is responsible for managing users. It provides the UI for adding, editing, deleting, and filtering users. The users are fetched from the backend API and displayed in a table.

2. RoleManagement.js
This component is used to manage roles. Roles are displayed in a dropdown for user management and allow administrators to define the access levels.

3. PermissionManagement.js
This component manages the permissions. It displays the permissions that can be associated with different roles.


Missing Data in db.json: If the db.json file is empty or missing the required fields, the application will fail to fetch users, roles, or permissions. Ensure the file contains the correct structure (like shown in the example above).


This project is licensed under the MIT License.