import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p className="p-10">Loading profile...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
};

export default Profile;
