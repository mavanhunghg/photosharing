import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";
import "./styles.css"

const UserList = ({ setCurrentUser }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModel("/user/list")
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
            onClick={() => setCurrentUser({ name: `${user.first_name} ${user.last_name}` })}
            className="user-list-item">
            {user.first_name} {user.last_name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UserList;