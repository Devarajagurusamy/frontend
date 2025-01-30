import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/profile", { withCredentials: true })
      .then((response) => {
        setProfile(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        alert("Please log in to view your profile");
      });
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>{profile}</p>
    </div>
  );
}

export default Profile;
