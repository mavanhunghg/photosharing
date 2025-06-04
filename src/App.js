import './App.css';
import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from './components/LoginRegister';
import UploadFile from './components/UploadFile';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showUpLoad, setShowUpLoad] = useState(false)
  const [photos, setPhotos] = useState([]);
  // Hàm fetch lại danh sách ảnh
  const fetchPhotos = async (userId) => {
    const res = await fetch(`http://localhost:3000/api/photosOfUser/${userId}`, {
      credentials: "include"
    });
    const data = await res.json();
    setPhotos(data);
  };

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar currentUser={currentUser} setCurrentUser={setCurrentUser} setShowUpLoad={setShowUpLoad} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {currentUser && <UserList setCurrentUser={setCurrentUser} />}
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                {!currentUser ? (
                  <Route path="*" element={<LoginRegister setCurrentUser={setCurrentUser} />} />
                ) : (
                  <>
                    <Route path="/" element={<Navigate to="/users" />} />
                    <Route
                      path="/users/:userId"
                      element={<UserDetail setCurrentUser={setCurrentUser} />}
                    />
                    <Route
                      path="/photos/:userId"
                      element={<UserPhotos currentUser={currentUser} setCurrentUser={setCurrentUser} />}
                    />
                    <Route path="/users" element={<UserList setCurrentUser={setCurrentUser} />} />
                    <Route path="/upload"
                          element={
                          <UploadFile
                            onUploaded={() => {
                              if (currentUser) fetchPhotos(currentUser._id); }}
                          />
                        }
                     />
                  </>
                )}
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;