import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import { Modal, Title, ColumnContainer, ButtonContainer } from './UpsertSurat.style'
import TextField from "@material-ui/core/TextField";
import moment from 'moment'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import statusConfig from './statusConfig.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Colors } from '../../styles/color'
import { BACKEND } from '../../utils'
import useAxios from "axios-hooks";
import axios from 'axios'
import { withCookies } from 'react-cookie';


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

const UpsertSurat = props => {
  const { toggle, actionType, dataItem, access, refetch, setNotif, masterData } = props;
  const classes = useStyles();
  const [postLoading, setPostLoading] = useState(false)
  const [dataState, setDataState] = useState(
    actionType === 'Edit' ?
      {
        ...dataItem,
        tanggal_disetujui: dataItem.tanggal_disetujui !== '-'
          ? moment(dataItem.tanggal_disetujui, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
        tanggal_pengajuan: moment(dataItem.tanggal_pengajuan, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      } :
    {
    nomor_surat: "0",
    id_jenis_surat: 1,
    status: 0,
    tanggal_pengajuan: moment().format('YYYY-MM-DD'),
    tanggal_disetujui: null,
    keterangan: "",
    uuid_user: props.allCookies.user.uuid
      })
  
  const handleNumberChange = (event) => {
    setDataState({
      ...dataState,
      nomor_surat: event.target.value.replace(/[^0-9]/g, "")
    });
  };

  const handleChange = (id, event) => {
    setDataState({
      ...dataState,
      [id]: event.target.value
    });
  };

  const handleDateChange = (id, date) => {
    setDataState({
      ...dataState,
      [id]: moment(date).format()
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
    setPostLoading(true)
    if (actionType === 'Tambah') {
      axios.post(BACKEND.ADD_PENGAJUAN_SURAT, {
      ...dataState,
      tanggal_pengajuan: moment(dataState.tanggal_pengajuan).format('YYYY-MM-DD'),
      tanggal_disetujui: null
      }, {
      headers: {
        'Authorization': `Bearer ${props.allCookies.user.jwttoken}`,
        'Content-Type': 'application/json'
      }
      }).then(res => {
        closeModal("success", "tambah")
      }).catch(err => {
        console.log('RES ERROR: ', err)
        closeModal("error", "tambah")
      })
    } else {
      console.log('dataState: ', dataState)
      axios.post(`${BACKEND.EDIT_PENGAJUAN_SURAT}/${dataState.id}`, {
        ...dataState,
        nomor_surat: (dataState.status === 2 ? moment().format('HHmmssSSYYMMDD') : dataState.nomor_surat),
        tanggal_pengajuan: moment(dataState.tanggal_pengajuan).format('YYYY-MM-DD'),
        tanggal_disetujui: (dataState.status === 2 ? moment().format('YYYY-MM-DD') : dataState.tanggal_disetujui),
      }, {
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

  const listStatus = actionType === 'Tambah' ?
    statusConfig.defaultStatus :
    props.allCookies.user.id_role === 2 ? 
    statusConfig.adminStatus :
    statusConfig.principalStatus

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
        <Title>{actionType + ' Pengajuan Surat'}</Title>
        <ColumnContainer full>
        <TextField
            disabled
            id="nomor_surat"
            style={{ marginBottom: 15 }}
            label={'Nomor Surat'}
            value={dataState.nomor_surat === "0" ? "XXXXXXXXXXXXXX" : dataState.nomor_surat}
            onChange={handleNumberChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </ColumnContainer>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <ColumnContainer>
        <InputLabel id="demo-simple-select-label">Jenis Surat</InputLabel>
          <Select
            disabled={(actionType === 'Edit' &&
            dataState.uuid_user === props.allCookies.user.uuid) && !dataState.tanggal_disetujui ||
            actionType === 'Tambah' ? 
            false : true}
            labelId="demo-simple-select-label"
            id="id_jenis_surat"
            value={dataState.id_jenis_surat}
            onChange={e => (handleChange("id_jenis_surat", e))}
            >
            <MenuItem key={0} value={dataState.status}>{' '}</MenuItem>
            {masterData.map((data, i) => 
              <MenuItem key={data.id} value={data.id}>{data.nama}</MenuItem>
            )}
          </Select>
        </ColumnContainer>
        <ColumnContainer>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            disabled={actionType === 'Edit' && access.update.includes(props.allCookies.user.id_role) ? false : true}
            labelId="demo-simple-select-label"
            id="status"
            value={dataState.status}
            onChange={e => (handleChange("status", e))}
                >
            <MenuItem key={0} value={dataState.status}>
              {statusConfig.defaultStatus[dataState.status].name}
            </MenuItem>
            {listStatus.map((data, i) => 
              <MenuItem key={i+1} value={data.id}>{data.name}</MenuItem>
            )}
          </Select>
        </ColumnContainer>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ColumnContainer>
            <KeyboardDatePicker
                disabled
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Tanggal Diajukan"
                value={dataState.tanggal_pengajuan}
                onChange={e => (handleDateChange("tanggal_pengajuan", e))}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </ColumnContainer>
            <ColumnContainer >
            <KeyboardDatePicker
                disabled
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Tanggal Disetujui"
                value={dataState.tanggal_disetujui}
                onChange={e => (handleDateChange("tanggal_disetujui", e))}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </ColumnContainer>
          </MuiPickersUtilsProvider>
        </div>
        <ColumnContainer full>
            <TextField
              disabled={(actionType === 'Edit' &&
              dataState.uuid_user === props.allCookies.user.uuid) && !dataState.tanggal_disetujui ||
              actionType === 'Tambah' ?
              false : true}
              id="nomor_surat"
              style={{ marginBottom: 15 }}
              label="Keterangan"
              value={dataState.keterangan}
              onChange={e => handleChange('keterangan', e)}
              InputLabelProps={{
                shrink: true,
              }}
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
          disabled={postLoading}
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

export default withCookies(UpsertSurat);
