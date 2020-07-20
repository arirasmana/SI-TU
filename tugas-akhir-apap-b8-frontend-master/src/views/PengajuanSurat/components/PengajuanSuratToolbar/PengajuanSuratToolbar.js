import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

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

const UsersToolbar = (props) => {
  const { 
    access,
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
          disabled={access.create.includes(allCookies.user.id_role) ? false : true}
          color="primary"
          variant="contained"
          onClick={() => {
            toggle('Tambah')
          }}
        >
          Tambah Pengajuan Surat
        </Button>
        
      </div>
    </div>
  );
};

export default withCookies(UsersToolbar);
