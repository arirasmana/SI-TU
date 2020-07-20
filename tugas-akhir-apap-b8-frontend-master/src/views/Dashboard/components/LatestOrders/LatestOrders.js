import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Divider,
  IconButton,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import useAxios from "axios-hooks";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import _ from 'lodash'

import PengajuanSurat from '../../PengajuanSurat'
import LinearProgress from '@material-ui/core/LinearProgress';
import RefreshIcon from '@material-ui/icons/Refresh';

import mockData from './data';
import { BACKEND, getAxios } from 'utils';
import { withCookies } from 'react-cookie';

const useStyles = makeStyles(theme => ({
  root: {
    height: 400
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  Disetujui: 'success',
  Menunggupersetujuan: 'info',
  Ditolak: 'danger'
};



const LatestOrders = props => {
  const {
    className,
    allCookies,
    loading,
    refetch,
    dashboardData,
    ...rest
  } = props;

  const classes = useStyles();
  const [dataState, setDataState] = useState(null)

  const [{ data: masterData, loading: dataLoading, error: getError }] = useAxios(
    getAxios(BACKEND.GET_ALL_JENIS_SURAT, allCookies.user.jwttoken)
  );

  useEffect(() => {
    if (masterData && dashboardData) {
      const weeks = new Array(10).fill(0)
      const dateList = _.reverse(weeks.map(((e, index) =>
        moment().subtract(index, 'days').format('YYYY-MM-DD'))))

      const filtered = (e, index, id) =>
        dashboardData.pengajuanSuratList.filter(dt => dt[2] === e && id == dt[1]).length > 0 ? 
          dashboardData.pengajuanSuratList.find(dt => dt[2] === e && id == dt[1])[index] : 0
      
      const allData = masterData.map(dt => Object.assign({}, {
        id: dt.nama.replace("Surat", "Srt."),
        color: "hsl(120, 70%, 50%)",
        data: dateList.map((data, index) =>
          Object.assign({}, {
          x: moment(data, 'YYYY-MM-DD').format('DD/MM'),
          y: filtered(data, 0, dt.id)
        }))
      }))
      setDataState(allData)
    }
  }, [dashboardData, masterData])


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton
            size="small"
            onClick={() => refetch()}
          >
            <RefreshIcon />
          </IconButton>
        }
        title="Pengajuan Surat Harian"
      />
      <Divider />
      {!dataState ? 
      <LinearProgress /> :
      <PengajuanSurat dataState={dataState} />}
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default withCookies(LatestOrders);
