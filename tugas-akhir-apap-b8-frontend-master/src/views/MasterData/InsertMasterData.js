import useAxios from "axios-hooks";
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from "@material-ui/core/TextField";
import { Modal, Title, ColumnContainer, ButtonContainer } from './MasterData.style'
import { withCookies } from "react-cookie";
import axios from 'axios'
import { BACKEND } from "utils";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
  modal: {
    zIndex: 50000,
  }
}));

const UpserMasterData = props => {
  const { refetch, setNotif, masterSelected, allCookies, toggle } = props;
  const classes = useStyles();
  const [postLoading, setPostLoading] = useState(false)
  const [errorField, setErrorField] = useState(null)
  const [dataState, setDataState] = useState({
    nama: "",
    keterangan: ""
  })

  const handleChange = (id, event) => {
    if (errorField) {
      setErrorField(null)
    }
    setDataState({
      ...dataState,
      [id]: event.target.value
    });
  };

  const closeModal = (status, mode) => {
    setNotif({
      showNotif: true,
      status: status,
      title: mode
    })
    toggle()
    refetch()
    setPostLoading(false)
  }

  const validation = () => {
    if (dataState.nama !== "") {
      setPostLoading(true)
      axios.post(masterSelected.mutation, dataState, {
      headers: {
        'Authorization': `Bearer ${allCookies.user.jwttoken}`,
        'Content-Type': 'application/json'
      }
      }).then(res => {
        if (!res.data.status) {
          setErrorField(res.data.description)
          setPostLoading(false)
        } else {
          closeModal("success", "tambah")
        }
      }).catch(err => {
        closeModal("error", "tambah")
      })
    } else {
      setErrorField(`Nama ${masterSelected.title} tidak boleh kosong`)
    }
  }



  return (
    <Backdrop className={classes.backdrop} open={true}>
      <Dialog 
      className={classes.modal}
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Modal>
      <div>
      <Title>{`Tambah ${masterSelected.title}`}</Title>
      <ColumnContainer full>
      <TextField
          error={!errorField ? false : true}
          id="nama"
          style={{ marginBottom: 15 }}
          label={'Nama'}
          value={dataState.nama}
          onChange={(event) => handleChange("nama", event)}
          helperText={errorField}
        />
      </ColumnContainer>
      <ColumnContainer full>
      <TextField
          id="keterangan"
          style={{ marginBottom: 15 }}
          label={'Keterangan'}
          value={dataState.nomor_surat}
          onChange={(event) => handleChange("keterangan", event)}
        />
      </ColumnContainer>
      </div>
      <ButtonContainer>
        <Button 
          disabled={postLoading}
          color="primary" 
          variant="contained"
          style={{width: 100, marginLeft: 20}} 
          onClick={validation}
        >
          {postLoading ? <CircularProgress color="inherit" size={20}/> : 'Simpan'}
        </Button>
        <Button 
          color="primary" 
          style={{width: 100}} 
          onClick={toggle}
        >Batal</Button>
      </ButtonContainer>
        
      </Modal>
      </Dialog>
    </Backdrop>
  );
};

export default withCookies(UpserMasterData);
