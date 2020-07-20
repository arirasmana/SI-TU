import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { Logout } from '../../../../components'
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';
import { Colors } from 'styles';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1,
  },
  title: {
    fontWeight: 700,
    fontSize: 24,
    color: "#FFF"
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const [showLogout, setShowLogout] = useState(false)
  const classes = useStyles();

  const toggle = () => {
    setShowLogout(!showLogout)
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      {showLogout && <Logout toggle={toggle}/>}
      <Toolbar>
        <RouterLink to="/">
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{color: Colors.White, marginTop: -5, marginRight: 15}}>
              <WorkTwoToneIcon fontSize="large" />
            </div>
            
            <Typography
              className={classes.title}
              // color="#FFF"
              gutterBottom
              variant="body2"
            >
              SI - TU Group B
            </Typography>
          </div>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton
            onClick={toggle}
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
