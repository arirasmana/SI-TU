import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Button, FormHelperText } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Modal, Title, ColumnContainer, ButtonContainer } from './UpsertLowongan.style'
import TextField from "@material-ui/core/TextField";
import moment from 'moment'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { BACKEND } from '../../utils'
import useAxios from "axios-hooks";
import axios from 'axios'
import FormControl from '@material-ui/core/FormControl';
import { withCookies } from 'react-cookie';
import { Colors } from 'styles';


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
  modal: {
    zIndex: 50000,
  }
}));

const UpsertLowongan = props => {
  const { toggle, actionType, dataItem, access, refetch, setNotif } = props;
  const classes = useStyles();
  const [postLoading, setPostLoading] = useState(false)
  const [dataState, setDataState] = useState(
    actionType === 'Edit' ?
      {
        ...dataItem,
        tanggal_dibuka: moment(dataItem.tanggal_dibuka, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        tanggal_ditutup: moment(dataItem.tanggal_ditutup, 'DD/MM/YYYY').add(7, 'days').format('YYYY-MM-DD'),
      } : 
    {
    judul: "",
    jumlah: "",
    keterangan: "",
    id_jenis_lowongan: 0,
    tanggal_dibuka: moment().format('YYYY-MM-DD'),
    tanggal_ditutup: moment().add(7, 'days').format('YYYY-MM-DD'),
    uuid_user: props.allCookies.user.uuid
      })
  const [error, setError] = useState({
    judul: false,
    jumlah: false,
    id_jenis_lowongan: false,
    tanggal_dibuka: false,
  })

  console.log('LOWONGAN: ', dataState)
  
  const handleNumberChange = (event) => {
    setDataState({
      ...dataState,
      jumlah: event.target.value.replace(/[^0-9]/g, "")
    });
  };

  const handleChange = (id, event) => {
    if (event.target.value !== "" || event.target.value !== 0) {
      setError({
        ...error,
        [id]: false
      })
    }
    setDataState({
      ...dataState,
      [id]: event.target.value
    });
  };

  const handleDateChange = (id, date) => {
    setDataState({
      ...dataState,
      [id]: moment(date).format('YYYY-MM-DD')
    });
  }

  const closeModal = (status, mode) => {
    setNotif({
      showNotif: true,
      status: status,
      title: mode
    })
    toggle('none')
    refetch()
    setPostLoading(false)
  }

  const validation = () => {
    if (dataState.judul === "" ||
      dataState.jumlah === "" ||
      dataState.jumlah === 0 ||
      dataState.id_jenis_lowongan === 0 ||
      dataState.tanggal_dibuka < moment().format('YYYY-MM-DD') ||
      dataState.tanggal_ditutup < moment(dataState.tanggal_dibuka).add(1, 'days').format('YYYY-MM-DD')
    ) {
      setError({
        judul: dataState.judul === "" ? true : false,
        jumlah: dataState.jumlah === "" || dataState.jumlah === 0 ? true : false,
        id_jenis_lowongan: dataState.id_jenis_lowongan === 0 ? true : false,
      })
    } else {
      setPostLoading(true)
      if (actionType === 'Tambah') {
        axios.post(BACKEND.ADD_LOWONGAN, dataState, {
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
        axios.post(`${BACKEND.EDIT_LOWONGAN}/${dataState.id}`, dataState, {
        headers: {
          'Authorization': `Bearer ${props.allCookies.user.jwttoken}`,
          'Content-Type': 'application/json'
        }
        }).then(res => {
          closeModal("success", "edit")
        }).catch(err => {
          closeModal("error", "edit")
        })
      }
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
        <Title>{actionType + ' Lowongan'}</Title>
        <ColumnContainer full>
          <TextField
            disabled={actionType === 'Edit' ? true : false}
            error={error.judul}
            helperText={error.judul ? 'Harap isi Judul' : ''}
            id="nomor"
            style={{ marginBottom: 15 }}
            label={'Judul'}
            value={dataState.judul}
            onChange={e => (handleChange("judul", e))}
          />
        </ColumnContainer>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <ColumnContainer>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Jenis Lowongan</InputLabel>
            <Select
              disabled={actionType === 'Edit' ? true : false}
              error={error.id_jenis_lowongan}
              // placeholder={error.id_jenis_lowongan ? 'Harap pilih Jenis Lowongan' : 'Pilih Jenis Lowongan'}
              labelId="demo-simple-select-label"
              id="id_jenis_lowongan"
              value={dataState.id_jenis_lowongan}
              onChange={e => (handleChange("id_jenis_lowongan", e))}
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>Full Time</MenuItem>
              <MenuItem value={2}>Part Time</MenuItem>
              <MenuItem value={3}>Kontrak</MenuItem>
          </Select>
          <FormHelperText style={{color: Colors.Red}} >{error.id_jenis_lowongan ? 'Harap pilih Jenis Lowongan' : ''}</FormHelperText>
        </FormControl>
        </ColumnContainer>
        <ColumnContainer>
        <TextField
            id="jumlah"
            error={error.jumlah}
            helperText={error.jumlah ? 'Harap isi jumlah lowongan' : ''}
            style={{ marginBottom: 15 }}
            label="Jumlah"
            value={dataState.jumlah}
            onChange={handleNumberChange}
          />
        </ColumnContainer>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ColumnContainer>
          <KeyboardDatePicker
            error={actionType === 'Tambah' && dataState.tanggal_dibuka < moment().format('YYYY-MM-DD')}
            helperText={actionType === 'Tambah' && dataState.tanggal_dibuka < moment().format('YYYY-MM-DD') ?
              'Tanggal dibuka minimal hari ini' :
              ''}
            disabled={actionType === 'Edit' ? true : false}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Tanggal Dibuka"
            value={dataState.tanggal_dibuka}
            onChange={e => (handleDateChange("tanggal_dibuka", e))}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </ColumnContainer>
        <ColumnContainer>
        <KeyboardDatePicker
            disableToolbar
            error={actionType === 'Tambah' && dataState.tanggal_ditutup < moment(dataState.tanggal_dibuka).add(1, 'days').format('YYYY-MM-DD')}
            helperText={actionType === 'Tambah' && dataState.tanggal_ditutup < moment(dataState.tanggal_dibuka).add(1, 'days').format('YYYY-MM-DD') ?
              'Minimal 1 hari setelah tanggal dibuka' :
              ''}
            disabled={actionType === 'Edit' ? true : false}
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Tanggal Ditutup"
            value={dataState.tanggal_ditutup}
            onChange={e => (handleDateChange("tanggal_ditutup", e))}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </ColumnContainer>
        </MuiPickersUtilsProvider>
        </div>
        <ColumnContainer full>
        <TextField
            id="keterangan"
            disabled={actionType === 'Edit' ? true : false}
            style={{ marginBottom: 15 }}
            label="Keterangan"
            value={dataState.keterangan}
            onChange={e => handleChange('keterangan', e)}
          />
        </ColumnContainer>
      
      </div>
      <ButtonContainer>
        <Button 
          disabled={postLoading}
          color="primary" 
          style={{width: 100, marginLeft: 20}} 
          onClick={validation}
          variant="contained"
          >
            {postLoading ? <CircularProgress color="inherit" size={20}/> : 'Simpan'}
        </Button>
        <Button 
        color="primary" 
        style={{width: 100}} 
        onClick={() => toggle('none')}
      >Batal</Button>
      </ButtonContainer>
      </Modal>
      </Dialog>
    </Backdrop>
  );
};

export default withCookies(UpsertLowongan);
