import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import { withCookies } from 'react-cookie';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { SpinnerCard } from './UsersTable.style'
import CircularProgress from '@material-ui/core/CircularProgress';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  const { className, dataState, allCookies, toggle, loading, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const onChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const calculatePage = page * rowsPerPage + rowsPerPage < dataState.length ? page * rowsPerPage : 
  // page * rowsPerPage + rowsPerPage < dataState.length ? page * rowsPerPage + rowsPerPage : dataState.length

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Tempat Lahir</TableCell>
                  <TableCell>Tanggal Lahir</TableCell>
                  <TableCell>Alamat</TableCell>
                  <TableCell>No. Handphone</TableCell>
                  <TableCell>NIP</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? 
                <TableRow>
                  <TableCell colSpan={9} rowSpan={10} padding="checkbox">
                    <SpinnerCard>
                      <CircularProgress />
                    </SpinnerCard>
                  </TableCell> 
                </TableRow> :
                  dataState
                    .concat(Array(dataState.length % 10 !== 0 ? 10 - dataState.length % 10 : 0).fill({}))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={index}
                   >
                     <TableCell>{user.nama ? (page*10)+(index + 1) : ''}</TableCell>
                    <TableCell>{user.nama}</TableCell>
                    <TableCell>{user.tempat_lahir}</TableCell>
                    <TableCell>{user.tanggal_lahir}</TableCell>
                    <TableCell>{user.alamat}</TableCell>
                    <TableCell>{user.telepon}</TableCell>
                     <TableCell>{`${user.nip ? user.nip.substring(0, 19)+'...' : ''}`}</TableCell>
                     <TableCell> {
                       user.nama ? 
                         <div>
                           {allCookies.user.id_role === 2 && user.id ?
                        <IconButton 
                          color="primary" 
                          onClick={() => {
                            toggle('Edit', user)
                          }}
                          >
                          <EditIcon style={{width: 20, height: 20}} />
                          </IconButton> :
                          <IconButton 
                            color="primary" 
                            disabled
                          >
                          <EditIcon style={{width: 20, height: 20}} />
                          </IconButton>}
                        { (allCookies.user.id_role === 2 && user.id) && user.uuid !==  allCookies.user.uuid ?
                        <IconButton 
                          style={{ color: '#c62828' }}
                          onClick={() => {
                            toggle('Hapus', user)
                          }}
                          component="span">
                          <DeleteIcon style={{width: 20, height: 20}} />
                        </IconButton> :
                        <IconButton  disabled>
                          <DeleteIcon style={{width: 20, height: 20}} />
                        </IconButton>}
                         </div> :
                         <IconButton 
                           disabled
                            style={{ color: '#FFFFFF' }}
                            component="span">
                          <DeleteIcon style={{width: 20, height: 20}} />
                        </IconButton>
                     }
                        
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={dataState.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={onChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </CardActions>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  dataState: PropTypes.array.isRequired
};

export default withCookies(UsersTable);
