import React, { useState, useEffect } from "react";
import axios from "axios";

const PermissionManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState({});
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/roles")
      .then((response) => setRoles(response.data))
      .catch((error) => console.error("Error fetching roles:", error));
    axios
      .get("http://localhost:5001/permissions")
      .then((response) => setPermissions(response.data))
      .catch((error) => console.error("Error fetching permissions:", error));
  }, []);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    axios
      .get(`http://localhost:5001/roles/${roleId}/permissions`)
      .then((response) => {
        const rolePerms = response.data.reduce(
          (acc, perm) => ({ ...acc, [perm.id]: true }),
          {}
        );
        setRolePermissions(rolePerms);
      })
      .catch((error) => console.error("Error fetching role permissions:", error));
  };

  const handlePermissionToggle = (permissionId) => {
    setRolePermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  const savePermissions = () => {
    const updatedPermissions = Object.keys(rolePermissions).filter(
      (permId) => rolePermissions[permId]
    );
    axios
      .put(`http://localhost:5001/roles/${selectedRole}/permissions`, {
        permissions: updatedPermissions,
      })
      .then(() => alert("Permissions updated successfully!"))
      .catch((error) => console.error("Error updating permissions:", error));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Permission Management</h2>
      <div className="mb-4">
        <label htmlFor="role-select" className="block mb-2 font-semibold">
          Select Role
        </label>
        <select
          id="role-select"
          className="border p-2 rounded w-full"
          value={selectedRole}
          onChange={(e) => handleRoleSelect(e.target.value)}
        >
          <option value="">-- Select Role --</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {selectedRole && (
        <div>
          <h3 className="text-lg font-bold mb-4">Permissions for {selectedRole}</h3>
          <ul className="space-y-2">
            {permissions.map((perm) => (
              <li key={perm.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`perm-${perm.id}`}
                  checked={rolePermissions[perm.id] || false}
                  onChange={() => handlePermissionToggle(perm.id)}
                  className="mr-2"
                />
                <label htmlFor={`perm-${perm.id}`} className="font-medium">
                  {perm.name}
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={savePermissions}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Permissions
          </button>
        </div>
      )}
    </div>
  );
};

export default PermissionManagement;