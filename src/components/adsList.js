import React from 'react';
import { Grid } from '@material-ui/core';
import AdsCard from './adCard'
import {useSelector} from "react-redux";


const AdsList = (props) => {
  const adverts = useSelector(state => state.adverts);
  var filteredList = [];
  if (props.category) {
    filteredList =  adverts.filter(function(ad) {
      return ad.category == props.category;
    });
  } else {
    filteredList = adverts
  }
  const listItems = filteredList.map((ad, index) =>
    {if (!props.isfavourite) {
      return(<Grid item md={4} key={index} justify="center">
        <AdsCard ad={ad} index={index}/>
      </Grid>)
    } else {
      if (ad.isfavourite) {
        return(<Grid item md={4} key={index} justify="center">
          <AdsCard ad={ad} index={index}/>
        </Grid>)
      }
    }}
  );

  return (
    <div>
    <Grid container spacing={3}>
      {listItems}
    </Grid>
  </div>
  );
}

export default AdsList
