import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { Grid } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { actionCreators } from "../store/actions";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    maxWidth: 390,
  },
  media: {
    height: 140,
  },
  favIcon: {
    position: 'absolute',
    top: '0.3rem',
    right: '0.5rem'
  }
});

const AdsCard = (props) => {
  const classes = useStyles(); 
  const dispatch = useDispatch();

  const maskItAsFav = (index) => () => {
    dispatch(actionCreators.maskItAsFav(index));
  };

  return (
    <Card className={classes.root}>    
      <CardActionArea>
        <Grid container justify="flex-end">
          <Fab color="primary" aria-label="fav" onClick={maskItAsFav(props.index)} className={classes.favIcon}>
            {props.ad.isfavourite ? 
              <FavoriteIcon/>
            :
              <FavoriteBorderIcon/>
            }
          </Fab> 
        </Grid> 
        <CardMedia
          className={classes.media}
          image={props.ad.imageUrl}
          title= {props.ad.name}
        />
        <CardContent>
          <Typography gutterBottom variant="caption" component="h2" align="left">
            {props.ad.category}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" align="left">
            {props.ad.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="left">
            {props.ad.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>   
  );
}

export default AdsCard