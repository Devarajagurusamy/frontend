import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>User List</h2>
      <Link to="/signup">Create User</Link>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
            <Link to={`/edit/${user._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
