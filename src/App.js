import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserManagement from "./pages/UserManagement.js";
import RoleManagement from "./pages/RoleManagement.js";
import PermissionManagement from "./pages/PermissionManagement.js";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-center text-2xl font-bold">RBAC Dashboard</h1>
          <nav className="flex justify-center space-x-4 mt-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/users" className="hover:underline">
              User Management
            </Link>
            <Link to="/roles" className="hover:underline">
              Role Management
            </Link>
            <Link to="/permissions" className="hover:underline">
              Permission Management
            </Link>
          </nav>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<h2>Welcome to the RBAC Dashboard</h2>} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/permissions" element={<PermissionManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;