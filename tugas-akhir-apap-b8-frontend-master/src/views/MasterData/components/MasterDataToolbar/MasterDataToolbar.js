import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withCookies } from 'react-cookie';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 10
  },
  formControl: {
    minWidth: 250
  },
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

const masterList = [{
  id: 1,
  title: "Jenis Surat"
},
  {
  id: 2,
  title: "Jenis Lowongan"
}]

const MasterDataToolbar = props => {
  const { className, toggle, allCookies, masterSelected, setMasterSelected, ...rest } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    setMasterSelected(event.target.value);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">List Master Data</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={masterSelected}
            onChange={handleChange}
            label="List Master Data"
            >
          {masterList.map((data, index) => <MenuItem key={index} value={data.id}>{data.title}</MenuItem>)}
        </Select>
      </FormControl>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => toggle('add')}
          disabled={allCookies.user.id_role === 2 ? false : true}
        >
          {`Tambah ${masterList.find(dt => dt.id === masterSelected).title}`}
        </Button>
        
      </div>
    </div>
  );
};

MasterDataToolbar.propTypes = {
  className: PropTypes.string
};

export default withCookies(MasterDataToolbar);
