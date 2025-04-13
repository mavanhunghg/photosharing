import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import models from '../../modelData/models';
import './styles.css';

function TopBar() {
  const location = useLocation();
  let context = '';

  // Extract userId and set context
  const pathParts = location.pathname.split('/');
  if (pathParts[1] === 'users' && pathParts[2]) {
    const user = models.userModel(pathParts[2]);
    context = user ? `${user.first_name} ${user.last_name}` : '';
  } else if (pathParts[1] === 'photos' && pathParts[2]) {
    const user = models.userModel(pathParts[2]);
    context = user ? `Photos of ${user.first_name} ${user.last_name}` : '';
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
          Ma Van Hung
        </Typography>
        <Typography variant="h5" color="inherit">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;