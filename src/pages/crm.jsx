import { useEffect, useState } from "react";
import PageHeader from "../components/common/pageHeader";
import httpService from "../services/httpService";

function Crm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data } = await httpService.get("/users");
    setUsers(data);
  };

  const toggleBizStatus = async (id, currentStatus) => {
    await httpService.patch(`/users/${id}`, { biz: !currentStatus });
    loadUsers();
  };

  const deleteUser = async (id, role) => {
    if (role === "admin") return alert("Cannot delete admin user.");
    await httpService.delete(`/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container mt-4">
      <PageHeader title="CRM System" description="Admin: Manage all users" />

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th className="text-center">Change Status</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u.id}>
              <td>{idx + 1}</td>
              <td>{u.first} {u.last}</td>
              <td>{u.email}</td>
              <td>{u.biz ? "Business" : "Regular"}</td>
              <td>{u.role}</td>
              <td className="text-center">
                {u.role !== "admin" && (
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => toggleBizStatus(u.id, u.biz)}
                  >
                    Set {u.biz ? "Regular" : "Business"}
                  </button>
                )}
              </td>
              <td className="text-center">
                {u.role !== "admin" && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteUser(u.id, u.role)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Crm;
