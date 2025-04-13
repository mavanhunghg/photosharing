import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
} from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import models from '../../modelData/models';
import './styles.css';

function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);

  if (!photos || photos.length === 0) {
    return <Typography>Không tìm thấy ảnh</Typography>;
  }

  return (
    <Box p={2}>
      {photos.map(photo => (
        <Card key={photo._id} style={{ marginBottom: '20px' }}>
          <CardMedia
            component="img"
            height="300"
            image={`/images/${photo.file_name}`} // Đường dẫn này trỏ đến public/images/
            alt="Ảnh của người dùng"
          />
          <CardContent>
            <Typography>
              Ngày tạo: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            {photo.comments && photo.comments.length > 0 && (
              <Box mt={2}>
                <Typography variant="h6">Bình luận</Typography>
                {photo.comments.map(comment => (
                  <Box key={comment._id} mb={1}>
                    <Typography>
                      <Link
                        component={RouterLink}
                        to={`/users/${comment.user._id}`}
                      >
                        {comment.user.first_name} {comment.user.last_name}
                      </Link>{' '}
                      ({new Date(comment.date_time).toLocaleString()}):
                    </Typography>
                    <Typography>{comment.comment}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;