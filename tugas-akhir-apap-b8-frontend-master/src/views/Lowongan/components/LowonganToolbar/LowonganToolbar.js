import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { withCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const LowonganToolbar = props => {
  const { 
    toggle, 
    className,
    allCookies,
    ...rest } = props;
  const classes = useStyles();
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          disabled={allCookies.user.id_role === 2 ? false : true}
          onClick={() => {
            toggle('Tambah')
          }}
        >
          Tambah Lowongan
        </Button>
        
      </div>
    </div>
  );
};

export default withCookies(LowonganToolbar);
