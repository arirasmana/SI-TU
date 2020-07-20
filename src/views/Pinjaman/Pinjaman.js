import useAxios from "axios-hooks";
import { BACKEND } from '../../utils'
import { getAxios } from '../../utils'
import React, { useState } from 'react';
import { withCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/styles';
import {SnackBar} from '../../components'
import { PinjamanToolbar, PinjamanTable } from './components';
import InsertPinjaman from './InsertPinjaman'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Pinjaman = (props) => {
  const { allCookies } = props;
  const [showModal, setShowModal] = useState(false)
  const [actionType, setActionType] = useState('Tambah')
  const classes = useStyles();
  const [notif, setNotif] = useState({
    showNotif: false,
    status: "success",
    title: "tambah"
  })

  const toggle = () => {
    setShowModal(!showModal)
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
    getAxios(BACKEND.GET_ALL_PINJAMAN, allCookies.user.jwttoken)
  );

  return (
    <div className={classes.root}>
      {showModal && <InsertPinjaman 
        toggle={toggle} 
        refetch={refetch}
        setNotif={setNotif}
      />}
      <SnackBar 
        notif={notif.showNotif}
        status={notif.status}
        handleClose={handleClose}
        description={notif.status === "success" ?
          `Pengajuan Surat telah berhasil di${notif.title} !` :
          `[Error] Something Wrong!`
        } 
      />
      <PinjamanToolbar 
        setActionType={setActionType} 
        toggle={toggle} 
      />
      <div className={classes.content}>
        <PinjamanTable 
          loading={loading}
          dataState={loading ? [] : getData } 
        />
      </div>
    </div>
  );
};

export default withCookies(Pinjaman);
