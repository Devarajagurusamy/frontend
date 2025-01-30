import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/auth/logout", {}, { withCredentials: true })
      .then(() => {
        alert("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Error logging out");
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
