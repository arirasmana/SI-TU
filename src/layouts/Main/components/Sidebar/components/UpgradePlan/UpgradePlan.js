import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, colors } from '@material-ui/core';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import BookIcon from '@material-ui/icons/Book';
import StoreIcon from '@material-ui/icons/Store';
import { Colors } from 'styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: colors.grey[50]
  },
  media: {
    paddingTop: theme.spacing(2),
    height: 80,
    textAlign: 'center',
    '& > img': {
      height: '100%',
      width: 'auto'
    }
  },
  content: {
    padding: theme.spacing(1, 1, 0, 1)
  },
  actions: {
    padding: theme.spacing(0, 1, 0, 1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
}));

const UpgradePlan = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.content}>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
          style={{color: Colors.DarkGrey, fontWeight: 'bold'}}
        >
          QUICK ACCESS
        </Typography>
      </div>
      <div className={classes.actions}>
        <Button
          style={{
            width: "100%",
            color: '#c48643',
            marginBottom: 10,
            background: '#ffe8cf',
            justifyContent: 'flex-start',
          }}
          size="small"
          component="a"
          color="primary"
          target="_blank"
          href="http://si-ruangan-groupb.herokuapp.com/"
        >
          <HomeWorkIcon style={{ margin: 5 }} />
          SI Ruangan
        </Button>
        <Button
          style={{
            width: "100%",
            color: '#4a6353',
            marginBottom: 10,
            background: '#DEE8E1',
            justifyContent: 'flex-start',
          }}
          size="small"
          component="a"
          color="primary"
          target="_blank"
          href="https://si-perpus-b6-frontend.herokuapp.com/sign-in"
        >
          <BookIcon style={{ margin: 5}} />
          SI Perpustakaan
        </Button>
        <Button
          style={{
            width: "100%",
            marginBottom: 10,
            background: '#dee5ff',
            justifyContent: 'flex-start'
          }}
          size="small"
          component="a"
          color="primary"
          target="_blank"
          href="https://si-perpus-b6-frontend.herokuapp.com/sign-in"
        >
          <StoreIcon style={{ margin: 5 }} />
          SI Koperasi
        </Button>
      </div>
    </div>
  );
};

UpgradePlan.propTypes = {
  className: PropTypes.string
};

export default UpgradePlan;
