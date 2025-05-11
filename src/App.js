import './App.css';

import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null); // Trạng thái để lưu thông tin người dùng hiện tại

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar currentUser={currentUser} /> {/* Truyền thông tin người dùng hiện tại vào TopBar */}
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList setCurrentUser={setCurrentUser} /> {/* Truyền hàm cập nhật người dùng */}
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/" element={<Navigate to="/users" />} />
                <Route
                  path="/users/:userId"
                  element={<UserDetail setCurrentUser={setCurrentUser} />}
                />
                <Route
                  path="/photos/:userId"
                  element={<UserPhotos setCurrentUser={setCurrentUser} />}
                />
                <Route path="/users" element={<UserList setCurrentUser={setCurrentUser} />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;