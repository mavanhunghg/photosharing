import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const TopBar = ({ currentUser }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Ma Van Hung -B22DCCN363
        </Typography>
        <Typography variant="h6">
          {currentUser ? (currentUser.photos ? `Photos of ${currentUser.name}` : currentUser.name) : "Welcome"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;