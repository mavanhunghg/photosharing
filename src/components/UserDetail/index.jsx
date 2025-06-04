import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

const UserDetail = ({ setCurrentUser }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/user/${userId}`, {
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user details");
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUser(data);
          // setCurrentUser({ name: `${data.first_name} ${data.last_name}` });
          setError(null);
        } else {
          setError("User not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch user details");
      });
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.first_name} {user.last_name}</h2>
      <p><strong>Location:</strong> {user.location}</p>
      <p><strong>Description:</strong> {user.description}</p>
      <p><strong>Occupation:</strong> {user.occupation}</p>
      <Link to={`/photos/${userId}`} className="photo_link">View Photos</Link>
    </div>
  );
};

export default UserDetail;