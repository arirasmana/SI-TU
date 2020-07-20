import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardContent,
  CardActions,
  TablePagination
} from '@material-ui/core';
import _ from 'lodash'
import { withCookies } from 'react-cookie';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { SpinnerCard } from './LowonganTable.style'
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const LowonganTable = props => {
  const { 
    toggle,
    loading, 
    className, 
    dataState, 
    deleteAct, 
    allCookies,
    setDataItem,
    deleteToggle, 
    setActionType,
    ...rest } = props;

  const classes = useStyles();

  const jenis = [{
    id: 1,
    description: "Full Time"
  },
  {
    id: 2,
    description: "Part Time"
  },
  {
    id: 3,
    description: "Kontrak"
  }];

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  console.log('_.orderBy', _.orderBy(dataState, ['id'], ['desc']))

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
                  <TableCell>Judul</TableCell>
                  <TableCell>Jenis Lowongan</TableCell>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>Tgl Dibuka</TableCell>
                  <TableCell>Tgl Ditutup</TableCell>
                  <TableCell>Keterangan</TableCell>
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
              </TableRow>
                 :
                  _.orderBy(dataState, ['id'], ['desc'])
                    .map(data => Object.assign({}, {
                      ...data,
                      tanggal_dibuka: moment(data.tanggal_dibuka).format('DD/MM/YYYY'),
                      tanggal_ditutup: moment(data.tanggal_ditutup).format('DD/MM/YYYY')
                    }))
                  .concat(Array(dataState.length % 10 !== 0 ? 10 - dataState.length % 10 : 0).fill({}))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                  >
                    <TableCell>{user.judul && (page*10)+(index + 1)}</TableCell>
                    <TableCell>{user.judul}</TableCell>
                    <TableCell>{
                    jenis.find(e => e.id === user.id_jenis_lowongan) ?
                    jenis.find(e => e.id === user.id_jenis_lowongan).description : ""}
                    </TableCell>
                    <TableCell>{user.jumlah}</TableCell>
                    <TableCell>{user.tanggal_dibuka}</TableCell>
                    <TableCell>
                      {user.tanggal_ditutup}
                    </TableCell>
                    <TableCell>{user.keterangan}</TableCell>
                    <TableCell>
                      {user.judul ? <div>
                        {allCookies.user.id_role === 2 &&
                        moment().format() < moment(user.tanggal_dibuka, 'DD/MM/YYYY').format() ?
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
                        {allCookies.user.id_role === 2  &&
                        moment().format() < moment(user.tanggal_dibuka).format() ?
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
                          style={{ color: '#FFFFFF' }}
                          >
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
          count={loading || !dataState ? 0 : dataState.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </CardActions>
    </Card>
  );
};

LowonganTable.propTypes = {
  className: PropTypes.string,
  dataState: PropTypes.array.isRequired
};

export default withCookies(LowonganTable);
