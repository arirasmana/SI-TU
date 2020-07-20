import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Typography } from '@material-ui/core';
import { getRole } from '../../../../../../utils'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, allCookies, ...rest } = props;

  const classes = useStyles();
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={'/images/avatars/avatar_11.png'}
        to="/account"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {allCookies.user.name}
      </Typography>
      <Typography variant="body2">
        {getRole.find(dt => dt.id === allCookies.user.id_role).name}
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default withCookies(Profile);
