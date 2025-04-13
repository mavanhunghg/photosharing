import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import models from '../../modelData/models';
import './styles.css';

function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box p={2}>
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography>Location: {user.location}</Typography>
      <Typography>Description: {user.description}</Typography>
      <Typography>Occupation: {user.occupation}</Typography>
      <Link
        component={RouterLink}
        to={`/photos/${user._id}`}
        style={{ marginTop: '10px', display: 'inline-block' }}
      >
        View Photos
      </Link>
    </Box>
  );
}

export default UserDetail;