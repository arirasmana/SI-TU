import mockData from './data';
import useAxios from "axios-hooks";
import React, { useState } from 'react';
import { withCookies } from 'react-cookie';
import { SnackBar } from '../../components';
import { BACKEND, getAxios } from '../../utils'
import { makeStyles } from '@material-ui/styles';

import UpsertLowongan from './UpsertLowongan'
import DeleteLowongan from './DeleteLowongan'
import { LowonganToolbar, LowonganTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Lowongan = (props) => {
  const classes = useStyles();

  const [users] = useState(mockData);
  const [showModal, setShowModal] = useState(false)
  const [actionType, setActionType] = useState('none')
  const [dataItem, setDataItem] = useState({})
  const [notif, setNotif] = useState({
    showNotif: false,
    status: "success",
    title: "tambah"
  })

  const toggle = (mode, user) => {
    setShowModal(!showModal)
    setActionType(mode)
    setDataItem(user)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotif({
      showNotif: false,
      status: "success",
      title: "tambah"
    });
  };

  const [{ data: getData, loading, error: getError }, refetch] = useAxios(
    getAxios(BACKEND.GET_ALL_LOWONGAN, props.allCookies.user.jwttoken)
  );

  return (
    <div className={classes.root}>
      {(actionType === 'Edit' || actionType === 'Tambah') && 
      <UpsertLowongan 
        toggle={toggle}
        refetch={refetch}
        setNotif={setNotif}
        dataItem={dataItem}
        actionType={actionType} 
      />}
      {actionType === 'Hapus' && <DeleteLowongan
        dataItem={dataItem}
        toggle={toggle}
        refetch={refetch}
        setNotif={setNotif}
      />}
      <SnackBar 
        notif={notif.showNotif}
        status={notif.status}
        handleClose={handleClose}
        description={
          `Lowongan telah berhasil di${notif.title} !`
        } 
      />
      <LowonganToolbar 
        toggle={toggle}
        />
      <div className={classes.content}>
        <LowonganTable 
          toggle={toggle}
          loading={loading}
          dataState={loading ? [] : getData } 
        />
      </div>
    </div>
  );
};

export default withCookies(Lowongan);
