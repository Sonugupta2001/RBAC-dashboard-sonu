import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Viewer",
    status: "Active",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:5001/users")
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users. Please try again later.");
      });
    axios
      .get("http://localhost:5001/roles")
      .then((response) => setRoles(response.data))
      .catch((error) => {
        console.error("Error fetching roles:", error);
        alert("Failed to fetch roles. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveUser = () => {
    if (!formData.name.trim()) {
      alert("Name is required.");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Valid email is required.");
      return;
    }

    if (currentUser) {
      axios
        .put(`http://localhost:5001/users/${currentUser.id}`, formData)
        .then((response) => {
          setUsers(users.map((user) => (user.id === currentUser.id ? response.data : user)));
          resetForm();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          alert("Failed to update user. Please try again later.");
        });
    } else {
      axios
        .post("http://localhost:5001/users", formData)
        .then((response) => {
          setUsers([...users, response.data]);
          resetForm();
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          alert("Failed to add user. Please try again later.");
        });
    }
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:5001/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again later.");
      });
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", role: "Viewer", status: "Active" });
    setCurrentUser(null);
    setShowModal(false);
  };

  const openModal = (user = null) => {
    setCurrentUser(user);
    setFormData(
      user
        ? { name: user.name, email: user.email, role: user.role, status: user.status }
        : { name: "", email: "", role: "Viewer", status: "Active" }
    );
    setShowModal(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      (roleFilter ? user.role === roleFilter : true) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <div className="flex items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">{user.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => openModal(user)}
                    className="bg-green-500 text-white px-2 py-1 rounded mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {currentUser ? "Edit User" : "Add User"}
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-4"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;