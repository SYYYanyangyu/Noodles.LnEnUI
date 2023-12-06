// Card.tsx

import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardContent, Typography } from '@mui/material';

import { Link } from 'react-router-dom';

interface CardProps {
  photo: string;
  title: string;
  description: string;
  to:string;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: 'auto', /* 让卡片组件在容器中居中 */
    borderRadius: 10,
    boxShadow: '0px 0px 8px 1px rgba(0, 0, 0, 0.3)',
  },
  media: {
    height: 140,
    objectFit: 'cover',
  },
});

const CustomCard: React.FC<CardProps> = ({ photo, title, description,to }) => {
  const classes = useStyles();

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={photo}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Some description about the photo.
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CustomCard;