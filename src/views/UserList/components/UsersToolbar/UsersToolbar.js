import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
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

const UsersToolbar = props => {
  const { 
    toggle,
    setSearch,
    className, 
    allCookies,
    ...rest } = props;

  const classes = useStyles();

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          onChange={onChange}
            placeholder="Search user"
          />
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          disabled={allCookies.user.id_role === 2 ? false : true}
          onClick={() => {
            toggle('Tambah')
          }}
        >
          Tambah user
        </Button>
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default withCookies(UsersToolbar);
