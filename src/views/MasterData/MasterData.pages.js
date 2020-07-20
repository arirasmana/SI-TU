import useAxios from "axios-hooks";
import React, { useState } from 'react';
import { withCookies } from 'react-cookie';
import { SnackBar } from '../../components';
import { BACKEND, getAxios } from '../../utils';
import { makeStyles } from '@material-ui/styles';
import UpserMasterData from './InsertMasterData'
import DeleteMasterData from './DeleteMasterData'

import { MasterDataTable, MasterDataToolbar } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  }
}));

const masterList = [{
  id: 1,
  title: "Jenis Surat",
  query: BACKEND.GET_ALL_JENIS_SURAT,
  mutation: BACKEND.ADD_JENIS_SURAT,
  delete: BACKEND.DELETE_JENIS_SURAT
},
  {
  id: 2,
  title: "Jenis Lowongan",
  query: BACKEND.GET_ALL_JENIS_LOWONGAN,
  mutation: BACKEND.ADD_JENIS_LOWONGAN,
  delete: BACKEND.DELETE_JENIS_LOWONGAN
}]

const MasterData = (props) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState('none')
  const [dataItem, setDataItem] = useState({})
  const [masterSelected, setMasterSelected] = useState(1)
  const [notif, setNotif] = useState({
    showNotif: false,
    status: "success",
    title: "tambah"
  })

  const [{ data: getData, loading, error: getError }, refetch] = useAxios(
    getAxios(masterList.find(dt => dt.id === masterSelected).query, props.allCookies.user.jwttoken)
  );

  const toggle = (mode, dataItem) => {
    setShowModal(mode)
    setDataItem(dataItem)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotif(false);
  };

  return (
    <div className={classes.root}>
      {showModal === 'add' && <UpserMasterData 
        toggle={toggle}
        refetch={refetch}
        setNotif={setNotif}
        masterSelected={masterList.find(dt => dt.id === masterSelected)} />
      }
      {showModal === 'delete' && <DeleteMasterData
        toggle={toggle}
        refetch={refetch}
        dataItem={dataItem}
        setNotif={setNotif}
        masterSelected={masterList.find(dt => dt.id === masterSelected)}
      />}
      <SnackBar 
        notif={notif.showNotif}
        status={notif.status}
        handleClose={handleClose} 
        description={notif.status === "success" ?
          `${masterList.find(dt => dt.id === masterSelected).title} telah berhasil di${notif.title} !` :
          `[Error] Something Wrong!`
        }
      />
      <MasterDataToolbar 
        toggle={toggle}
        masterSelected={masterSelected}
        setMasterSelected={setMasterSelected}
      />
      <div className={classes.content}>
        <MasterDataTable 
          toggle={toggle}
          loading={loading}
          dataState={loading ? [] : getData} 
        />
      </div>
    </div>
  );
};

export default withCookies(MasterData);
