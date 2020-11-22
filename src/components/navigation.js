import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AdsList from './adsList'
import {useSelector} from "react-redux";
import { Button, Grid, Drawer, TextField, Select, MenuItem, FormControl, InputLabel, Container} from '@material-ui/core';

import { useDispatch } from "react-redux";
import { actionCreators } from "../store/actions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavigationControl() {
  const classes = useStyles();
  const adverts = useSelector(state => state.adverts);
  const [value, setValue] = React.useState(0);
  const [drawerState, setDrawerState] = React.useState(false);
  const [categoryState, setCategoryState] = React.useState(null);
  const [advertInputs, setAdvertInput] = React.useState({
    title: "",
    category: "",
    description:""
  });


  const listItems = adverts.map((ad, index) =>
    <MenuItem value={ad.category}>{ad.category}</MenuItem>
  );

  const handleCategoryChange = (event) => {
    setCategoryState(event.target.value);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(open);
  };

  const dispatch = useDispatch();

  const handleSubmit = () => (event) => {
    console.log("advertInputs -- ", advertInputs);
    dispatch(actionCreators.addToList(advertInputs));
    setDrawerState(false);
  };
  
  const categoryList = ( 
    <FormControl variant="filled" className={classes.formControl} style={{width: 170}} >
      <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        onChange={handleCategoryChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {listItems}
      </Select>
    </FormControl>
  );


  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
      <Grid container alignItems="center" justify='space-between'>
        <Grid container item xs={6} alignItems="center">
          <Box p={1}><b>Classified Ads</b></Box>
        </Grid>
        <Grid container item xs={6} justify="flex-end">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Favourite" {...a11yProps(1)} />
          </Tabs>
        </Grid>
      </Grid>
      </AppBar>
      <br/>
      <Box m={2}>
        <Grid container container alignItems="center">
          <Grid container item xs={6} justify="flex-start">
            {categoryList}
          </Grid>
          <Grid container item xs={6} justify="flex-end">
            <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>NEW CLASSIFIED</Button>
          </Grid>
        </Grid>
      </Box>
      <TabPanel value={value} index={0}>
        <AdsList category={categoryState}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdsList isfavourite={true}/>
      </TabPanel>
      <Drawer anchor="right" open={drawerState}>
        <Container maxWidth="xs">
        <Grid container justify="space-between" alignItems="center" style={{width: 320}}>
          <Button variant="outlined" color="default" onClick={toggleDrawer(false)}>X</Button>
          <h2>New Classified</h2>
        </Grid>
            <form className={classes.root} noValidate autoComplete="off">
              <Box m={1}>
                <TextField id="filled-basic" label="Title" variant="filled" fullWidth 
                onChange={event => setAdvertInput({...advertInputs, title:event.target.value})}/>
              </Box>
              <Box m={1}>
                <FormControl fullWidth variant="filled" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    onChange={event => setAdvertInput({...advertInputs, category:event.target.value})}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {listItems}
                  </Select>
                </FormControl>
              </Box>
              <Box m={1}>
                <TextField id="filled-basic" label="Description" variant="filled" multiline={true} rows={10} fullWidth
                onChange={event => setAdvertInput({...advertInputs, description:event.target.value})}/>
              </Box>
              <Box m={1}>
                <Button variant="contained" color="primary" onClick={handleSubmit()}>SAVE AND PUBLISH</Button>
              </Box>
            </form>
        </Container>
      </Drawer>
    </div>
  );
}
