import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";

const UserPhotos = ({ setCurrentUser }) => {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {

    fetchModel(`/user/${userId}`)
      .then((userData) => {
        if (userData) {
          setUserName(`${userData.first_name} ${userData.last_name}`);
          setCurrentUser({ name: `${userData.first_name} ${userData.last_name}`, photos: true });
        } else {
          setError("User not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch user details");
      });

  
    fetchModel(`/photosOfUser/${userId}`)
      .then((data) => {
        if (data) {
          setPhotos(data);
          setError(null);
        } else {
          setError("No photos found");
        }
      })
      .catch((err) => {
        console.error("Error fetching user photos:", err);
        setError("Failed to fetch user photos");
      });
  }, [userId, setCurrentUser]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!photos.length) {
    return <div>No photos available</div>;
  }

  return (
    <div>
      <h2>Photos of {userName}</h2> 
      {photos.map((photo) => (
        <div key={photo._id}>
          <img src={`/images/${photo.file_name}`} alt="User Photo" />
          <p><strong>Date:</strong> {new Date(photo.date_time).toLocaleString()}</p>
          <ul>
            {photo.comments.map((comment) => (
              <li key={comment._id}>
                <strong>{comment.user.first_name} {comment.user.last_name}:</strong> {comment.comment}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserPhotos;