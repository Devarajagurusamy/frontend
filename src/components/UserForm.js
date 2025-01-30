import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !password) {
      setErrorMessage("All fields are required!");
      return;
    }

    const newUser = { name, email, password };

    axios
      .post("http://localhost:3000/users/signup", newUser)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Failed to create user. Please try again.");
      });
  };

  return (
    <div>
      <h2>Create User</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default UserForm;
