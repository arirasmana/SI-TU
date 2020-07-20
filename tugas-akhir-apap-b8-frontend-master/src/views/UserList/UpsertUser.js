import moment from 'moment'
import React, { useState } from 'react';
import { Button, FormHelperText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from "@material-ui/core/TextField";
import { Modal, Title, ColumnContainer, ButtonContainer } from './UpsertUser.style'
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import getRole from '../../utils/get-role'
import { withCookies } from 'react-cookie';

import { BACKEND } from '../../utils'
import { Colors } from 'styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
  modal: {
    zIndex: 50000,
  }
}));

const requiredField = ['username', 'password', 'nama', 'tempat_lahir', 'telepon', 'id_role']

const UpsertUser = props => {
  const { toggle, refetch, setNotif, dataItem, actionType  } = props;
  const classes = useStyles();
  const [errorField, setErrorField] = useState([])
  const [postLoading, setPostLoading] = useState(false)
  const [dataState, setDataState] = useState(actionType === 'Edit' ?
    dataItem : {
    username: "",
    id_role: 0,
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: moment(),
    alamat: "",
    telepon: "",
    password: ""
  })

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

  const handleNumberChange = (event) => {
    setDataState({
      ...dataState,
      telepon: event.target.value.replace(/[^0-9]/g, "")
    });
  };

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
    const validateData = requiredField.filter(
      (data) => dataState[data] === "" || dataState[data] === 0
    );
    setErrorField(validateData);
    if (validateData.length === 0) {
      setPostLoading(true)
      if (actionType === 'Tambah') {
        axios.post(BACKEND.ADD_USER, dataState)
          .then(res => {
            closeModal("success", "tambah")
          }).catch(err => {
            closeModal("error", "tambah")
          })
      } else {
        setPostLoading(true)
        axios.post(`${BACKEND.EDIT_USER}/${dataState.uuid}`, dataState, {
            headers: {
              'Authorization': `Bearer ${props.allCookies.user.jwttoken}`,
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            closeModal("success", "edit")
          })
          .catch(err => {
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
        <Title>{`${actionType} User`}</Title>
        <ColumnContainer full>
          <TextField
            error={errorField.find((dt) => dt === "nama") ? true : false}
            id="nama"
            label={'Nama'}
            value={dataState.nama}
            onChange={(event) => handleChange("nama", event)}
            helperText={
              errorField.find((dt) => dt === "nama")
                ? "Harap isi kolom ini"
                : ""
            }
          />
        </ColumnContainer>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ColumnContainer>
              <TextField
                error={errorField.find((dt) => dt === "tempat_lahir") ? true : false}
                id="tempat_lahir"
                style={{ marginTop: 16 }}
                label={'Tempat Lahir'}
                value={dataState.tempat_lahir}
                onChange={(event) => handleChange("tempat_lahir", event)}
                helperText={
                  errorField.find((dt) => dt === "tempat_lahir")
                    ? "Harap isi kolom ini"
                    : ""
                }
              />
            </ColumnContainer>
            <ColumnContainer >
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd-MM-yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Tanggal Lahir"
                value={dataState.tanggal_lahir}
                onChange={e => (handleDateChange("tanggal_lahir", e))}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </ColumnContainer>
          </MuiPickersUtilsProvider>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ColumnContainer>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                error={errorField.find((dt) => dt === "id_role") ? true : false}
                id="id_role"
                value={dataState.id_role}
                onChange={e => (handleChange("id_role", e))}
                  >
                <MenuItem value={0}>None</MenuItem>
                {getRole.map((data, i) => 
                  <MenuItem key={i} value={data.id}>{data.name}</MenuItem>)}
              </Select>
              <FormHelperText style={{color: Colors.Red}} >{errorField.find((dt) => dt === "id_role")  ? 'Harap pilih Role' : ''}</FormHelperText>
            </ColumnContainer>
            <ColumnContainer >
              <TextField
                error={errorField.find((dt) => dt === "telepon") ? true : false}
                id="telepon"
                label={'No Handphone'}
                value={dataState.telepon}
                onChange={handleNumberChange}
                helperText={
                  errorField.find((dt) => dt === "telepon")
                    ? "Harap isi kolom ini"
                    : ""
                }
              />
            </ColumnContainer>
          </MuiPickersUtilsProvider>
        </div>
        <ColumnContainer full>
          <TextField
            id="alamat"
            label={'Alamat'}
            value={dataState.alamat}
            onChange={(event) => handleChange("alamat", event)}
          />
        </ColumnContainer>
        { actionType === 'Tambah' && <div style={{display: 'flex', flexDirection: 'row'}}>
          <ColumnContainer>
            <TextField
              error={errorField.find((dt) => dt === "username") ? true : false}
              id="username"
              label={'Username'}
              value={dataState.username}
              onChange={(event) => handleChange("username", event)}
              helperText={
                errorField.find((dt) => dt === "username")
                  ? "Harap isi kolom ini"
                  : ""
              }
            />
          </ColumnContainer>
          <ColumnContainer >
            <TextField
              type="password"
              error={errorField.find((dt) => dt === "password") ? true : false}
              id="password"
              label={'Password'}
              value={dataState.password}
              onChange={(event) => handleChange("password", event)}
              helperText={
                errorField.find((dt) => dt === "password")
                  ? "Harap isi kolom ini"
                  : ""
              }
            />
            
          </ColumnContainer>
        </div>}
      </div>
      <ButtonContainer>
        <Button 
          disabled={postLoading}
          color="primary" 
          variant="contained"
          style={{width: 100, marginLeft: 20}} 
          onClick={validation}
        >
          {postLoading ? <CircularProgress color="inherit" size={20}/> : 'Save'}
        </Button>
        <Button 
          disabled={postLoading}
          color="primary" 
          style={{width: 100}} 
          onClick={() => toggle('none')}
        >Cancel</Button>
      </ButtonContainer>
      </Modal>
      </Dialog>
    </Backdrop>
  );
};

export default withCookies(UpsertUser);
