import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import { Modal, Title, ColumnContainer, ButtonContainer } from './InsertPinjaman.style'
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import useAxios from "axios-hooks";
import axios from 'axios'
import { withCookies } from 'react-cookie';
import { BACKEND } from 'utils';


const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
  modal: {
    zIndex: 50000,
  }
}));

const InsertPinjaman = props => {
  const { toggle, refetch, setNotif } = props;
  const classes = useStyles();
  const [postLoading, setPostLoading] = useState(false)
  const [errorField, setErrorField] = useState(false)
  const [dataState, setDataState] = useState({
    jumlah_pinjaman: "",
    tanggal_pengajuan: moment().format('YYYY-MM-DD')
  })

  const handleDateChange = date => {
    setDataState({
      ...dataState,
      tanggal_pengajuan: moment(date).format()
    });
  }

  const handleNumberChange = (event) => {
    setDataState({
      ...dataState,
      jumlah_pinjaman: event.target.value.replace(/[^0-9]/g, "")
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
    if (dataState.jumlah_pinjaman !== "") {
      setPostLoading(true)
      axios.post(BACKEND.ADD_PINJAMAN, {
        status: 1,
        jumlah_pinjaman: dataState.jumlah_pinjaman,
        tanggal_pengajuan: dataState.tanggal_pengajuan,
        jumlah_pengembalian: 0,
        tanggal_pengembalian: null,
        tanggal_disetujui: null
      }, {
      headers: {
        'Authorization': `Bearer ${props.allCookies.user.jwttoken}`,
        'Content-Type': 'application/json'
      }
      }).then(res => {
        closeModal("success", "tambah")
      }).catch(err => {
        closeModal("error", "tambah")
      })
    } else {
      setErrorField(true)
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
      <Title>{'Ajukan Pinjaman'}</Title>
      <ColumnContainer full>
      <TextField
          error={errorField}
          id="jumlah_pinjaman"
          label={'Jumlah Pinjaman'}
          value={dataState.jumlah_pinjaman}
          onChange={handleNumberChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
          }}
          helperText={
            errorField
              ? "Please Fill This Field"
              : ""
          }
        />
      </ColumnContainer>
      <ColumnContainer full>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd-MM-yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Tanggal Pengajuan"
            value={dataState.tanggal_pengajuan}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
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
          disabled={postLoading}
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

export default withCookies(InsertPinjaman);
