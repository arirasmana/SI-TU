import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';
import { withCookies } from 'react-cookie';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import statusConfig from '../../statusConfig.js'
import { StatusBullet } from 'components';
import { SpinnerCard } from './PengajuanSuratTable.style'
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash'
import { Colors } from 'styles/color.js';

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
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
}));

const PengajuanSuratTable = props => {
  const { 
    toggle,
    access,
    className, 
    dataState, 
    masterData,
    allCookies,
    loading, ...rest } = props;
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const btnStyle = (data) => Object.assign({}, { color: !data && Colors.White, width: 20, height: 20})
  
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
                  <TableCell>No. Surat</TableCell>
                  <TableCell>Jenis Surat</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tgl Pengajuan</TableCell>
                  <TableCell>Tgl Disetujui</TableCell>
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
                  : dataState && _.orderBy(dataState, ['id'], ['desc'])
                    .map(data => Object.assign({}, {
                      ...data,
                      tanggal_pengajuan: data.tanggal_pengajuan !== null ? moment(data.tanggal_pengajuan).format('DD/MM/YYYY') : '-',
                      tanggal_disetujui: data.tanggal_disetujui !== null ? moment(data.tanggal_disetujui).format('DD/MM/YYYY') : '-'
                    }))
                    .concat(Array(dataState.length % 10 !== 0 ? 10 - dataState.length % 10 : 0).fill({}))
                    .slice((page) * rowsPerPage, (page + 1) * rowsPerPage).map((user, index) => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={index}
                    >
                      <TableCell>{user.tanggal_pengajuan && (page*10)+(index + 1)}</TableCell>
                      <TableCell>{user.nomor_surat === '0' ? '-' : user.nomor_surat}</TableCell>
                        <TableCell>{masterData.find(data => data.id === user.id_jenis_surat) ?
                          masterData.find(data => data.id === user.id_jenis_surat).nama : ''}</TableCell>
                      <TableCell>
                        {statusConfig.defaultStatus.find(data => data.id === user.status) ?
                        <div  className={classes.statusContainer}>
                          <StatusBullet
                            className={classes.status}
                            color={statusConfig.defaultStatus[user.status].color}
                            size="sm"
                          />
                          {statusConfig.defaultStatus[user.status].name}
                        </div> : 
                        ''  }</TableCell>
                      <TableCell>{user.tanggal_pengajuan}</TableCell>
                      <TableCell>
                        {user.tanggal_disetujui}
                      </TableCell>
                      <TableCell>{user.keterangan}</TableCell>
                      <TableCell>
                            {(allCookies.user.id_role === 1 &&
                            user.status) === 0 ||
                            (allCookies.user.id_role === 2 &&
                            user.status === 2)
                            ?
                          <IconButton 
                            color="primary" 
                            onClick={() => {
                              toggle('Edit', user)
                            }}
                            >
                            <EditIcon style={btnStyle(user.tanggal_pengajuan)} />
                            </IconButton> :
                            <IconButton 
                              color="primary" 
                              disabled
                            >
                            <EditIcon style={btnStyle(user.tanggal_pengajuan)} />
                            </IconButton>}
                          {
                            (user.uuid_user === allCookies.user.uuid ||
                              access.delete.includes(allCookies.user.id_role)) &&
                              user.status === 0
                            ?
                          <IconButton 
                            style={{ color: !user.tanggal_pengajuan ? Colors.White : '#c62828' }}
                            onClick={() => {
                              toggle('Hapus', user)
                            }}
                            component="span">
                            <DeleteIcon style={{width: 20, height: 20}} />
                          </IconButton> :
                          <IconButton  disabled>
                            <DeleteIcon style={btnStyle(user.tanggal_pengajuan)} />
                          </IconButton>}
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
          count={!loading && dataState ? dataState.length : 0}
          onChangePage={handlePageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </CardActions>
    </Card>
  );
};

PengajuanSuratTable.propTypes = {
  className: PropTypes.string,
  dataState: PropTypes.array.isRequired
};

export default withCookies(PengajuanSuratTable);
