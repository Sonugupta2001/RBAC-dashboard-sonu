import React, { useState, useEffect } from "react";
import axios from "axios";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5001/roles")
      .then((response) => setRoles(response.data))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveRole = () => {
    if (currentRole) {
      axios
        .put(`http://localhost:5001/roles/${currentRole.id}`, formData)
        .then((response) => {
          setRoles(
            roles.map((role) =>
              role.id === currentRole.id ? response.data : role
            )
          );
          resetForm();
        })
        .catch((error) => console.error("Error updating role:", error));
    } else {
      axios
        .post("http://localhost:5001/roles", formData)
        .then((response) => {
          setRoles([...roles, response.data]);
          resetForm();
        })
        .catch((error) => console.error("Error adding role:", error));
    }
  };

  const handleDeleteRole = (id) => {
    axios
      .delete(`http://localhost:5001/roles/${id}`)
      .then(() => {
        setRoles(roles.filter((role) => role.id !== id));
      })
      .catch((error) => console.error("Error deleting role:", error));
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setCurrentRole(null);
    setShowModal(false);
  };

  const openModal = (role = null) => {
    setCurrentRole(role);
    setFormData(role || { name: "", description: "" });
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Role Management</h2>
      <button
        onClick={() => openModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Role
      </button>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="border border-gray-300 px-4 py-2">{role.id}</td>
              <td className="border border-gray-300 px-4 py-2">{role.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {role.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => openModal(role)}
                  className="bg-green-500 text-white px-2 py-1 rounded mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mx-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {currentRole ? "Edit Role" : "Add Role"}
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Role Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              name="description"
              placeholder="Role Description"
              value={formData.description}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <button
              onClick={handleSaveRole}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={resetForm}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;