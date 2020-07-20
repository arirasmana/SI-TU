import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import UpsertUser from './UpsertUser'
import { getAxios } from '../../utils'
import { WEBSERVICE, BACKEND } from '../../utils'
import useAxios from "axios-hooks";
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { SnackBar } from '../../components'
import _ from 'lodash'
import DeleteUser from './DeleteUser'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const UserList = (props) => {
  const requestGuru = axios.get(WEBSERVICE.GET_GURU_SIVITAS);
  const requestSiswa = axios.get(WEBSERVICE.GET_SISWA_SIVITAS);
  const requestPegawai = axios.get(WEBSERVICE.GET_PEGAWAI_SIVITAS);
  const classes = useStyles();
  const [searchText, setSearch] = useState('')
  const [actionType, setActionType] = useState('none')
  const [dataItem, setDataItem] = useState({})
  const [notif, setNotif] = useState({
    showNotif: false,
    status: "success",
    title: "tambah"
  })
  const [sivitasData, setSivitasData] = useState({
    sivitasUser: [],
    loading: true
  })

  const [{ data: getDataUser, loading, error: userError }, refetch] = useAxios(
    getAxios(BACKEND.GET_ALL_USER, props.allCookies.user.jwttoken)
  );

  const mappingSivitas = (datas) => {
    return datas.map((data) => 
      Object.assign({}, {
        ...data,
        uuid: data.idUser,
        tempat_lahir: data.tempatLahir,
        tanggal_lahir: data.tanggalLahir,
        nip: data.nig ? data.nig : data.nis ? data.nis : data.nip
      })
    )
  }

  useEffect(() => {
    axios.all([requestGuru, requestSiswa, requestPegawai]).then(axios.spread((...res) => {
    setSivitasData({
      sivitasUser: mappingSivitas(
        res[0].data.result
        .concat(res[1].data.result)
        .concat(res[2].data.result)),
      loading: false
    })
  })).catch(errors => {
      console.log(errors)
    })
  }, [])

  const toggle = (mode, user) => {
    setActionType(mode)
    setDataItem(user)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotif(false);
  };

  const uniqueUUid = (sivitasData, tuUser) => {
    if (sivitasData.sivitasUser && tuUser) {
      const allUser = _.orderBy(tuUser, ['id'], ['desc']).concat(sivitasData.sivitasUser
        .filter(dt => !tuUser.map(dt => dt.uuid).includes(dt.idUser))) 
      const userFiltered = allUser.filter(data => _.includes(data.nama.toLowerCase(), searchText.toLowerCase()))
      const newRow = Array(userFiltered.length % 10 !== 0 ? 10 - userFiltered.length % 10 : 0).fill({});
      return userFiltered
    } else {
      return []
    }
  }

  

  return (
    <div className={classes.root}>
      {(actionType === 'Edit' || actionType === 'Tambah') && <UpsertUser 
        toggle={toggle}
        refetch={refetch}
        dataItem={dataItem}
        setNotif={setNotif}
        actionType={actionType} />
      }
      {actionType === 'Hapus' && <DeleteUser
        toggle={toggle}
        refetch={refetch}
        dataItem={dataItem}
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
      <UsersToolbar 
        toggle={toggle}
        setSearch={setSearch}
      />
      <div className={classes.content}>
        <UsersTable 
          toggle={toggle}
          loading={loading || sivitasData.loading}
          dataState={(loading && sivitasData.loading ) ? [] : uniqueUUid(sivitasData, getDataUser)} 
        />
      </div>
    </div>
  );
};

export default withCookies(UserList);
