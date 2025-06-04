import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css"

const UserList = ({ setCurrentUser }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/user/list", {
      credentials: "include" 
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user list");
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUsers(data);
          setError(null);
        } else {
          setError("No users found");
        }
      })
      .catch((err) => {
        console.error("Error fetching user list:", err);
        setError("Failed to fetch user list");
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!users.length) {
    return <div>No users available</div>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          <Link
            to={`/users/${user._id}`}
            className="user-list-item">
            {user.first_name} {user.last_name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UserList;