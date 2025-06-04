import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const TopBar = ({ currentUser, setCurrentUser, setShowUpLoad }) => {
  //console.log(currentUser)
  const navigate = useNavigate();
  const handleLogout = async () => {
    await fetch("/admin/logout", 
      { method: "POST", credentials: "include"
       });
    setCurrentUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Ma Van Hung - B22DCCN363
        </Typography>
        {currentUser ? (
          <>
              <Button color="inherit" onClick={() => navigate("/upload")}>
                Add Photo
              </Button>
            <Typography variant="h6" style={{ marginRight: 16 }}>
              Hi {currentUser.first_name}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Typography variant="h6">Please Login</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;