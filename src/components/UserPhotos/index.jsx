import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPhotos = ({ currentUser,setCurrentUser }) => {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [commentInput, setCommentInput] = useState({})
  useEffect(() => {
    fetch(`http://localhost:3000/api/user/${userId}`, {
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user details");
        return res.json();
      })
      .then((userData) => {
        if (userData) {
          setUserName(`${userData.first_name} ${userData.last_name}`);
          // setCurrentUser({ name: `${userData.first_name} ${userData.last_name}`, photos: true });
        } else {
          setError("User not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        setError("Failed to fetch user details");
      });

    fetch(`http://localhost:3000/api/photosOfUser/${userId}`, {
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user photos");
        return res.json();
      })
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
  const handleAddComment = async (photoId) => {
  const comment = commentInput[photoId];
  if (!comment) return;
  await fetch(`http://localhost:3000/api/commentsOfPhoto/${photoId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ comment }), // chỉ gửi nội dung comment
  });
  setCommentInput({ ...commentInput, [photoId]: "" }); // clear input sau khi gửi
  // Có thể fetch lại ảnh để cập nhật comment mới

  fetch(`http://localhost:3000/api/photosOfUser/${userId}`, {
    credentials: "include"
  })
    .then((res) => res.json())
    .then((data) => setPhotos(data));
};

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
                <p>{new Date(comment.date_time).toLocaleString()}</p>
                <strong>{comment.user.first_name} {comment.user.last_name}:</strong> {comment.comment}
              </li>
            ))}
          </ul>
          <label>
             Comment
           <input
              type="text"
              value={commentInput[photo._id] || ""}
              onChange={e => setCommentInput({ ...commentInput, [photo._id]: e.target.value })}/>
          </label>
          <button onClick={() => handleAddComment(photo._id)}>Add</button>
            <br />
            <br />
        </div>
      ))}
    </div>
  );
};

export default UserPhotos;