import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import models from '../../modelData/models';
import './styles.css';

function UserList() {
  const users = models.userListModel();

  return (
    <List component="nav">
      {users.map(user => (
        <ListItem
          button
          key={user._id}
          component={Link}
          to={`/users/${user._id}`}
        >
          <ListItemText primary={`${user.first_name} ${user.last_name}`} />
        </ListItem>
      ))}
    </List>
  );
}

export default UserList;