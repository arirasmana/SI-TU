import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Colors } from '../../styles/color'
import { BACKEND } from '../../utils'
import useAxios from "axios-hooks";
import axios from 'axios'
import { withCookies } from 'react-cookie';

import { DeleteModal, Title, ColumnContainer, ButtonContainer, Subtitle } from './UpsertLowongan.style'

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



const DeleteLowongan = props => {
  const { toggle, dataItem, refetch, allCookies, setNotif } = props;
  const classes = useStyles();
  const [postLoading, setPostLoading] = useState(false)

  const closeModal = (status) => {
    setNotif({
      showNotif: true,
      status: status,
      title: "hapus"
    })
    toggle('none')
    refetch()
    setPostLoading(false)
  }

  const validation = () => {
    setPostLoading(true)
    axios.get(`${BACKEND.DELETE_LOWONGAN}/${dataItem.id}`, {
      headers: {
        'Authorization': `Bearer ${allCookies.user.jwttoken}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      closeModal("success")
    }).catch(res => {
      closeModal("error")
    })
  }

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <Dialog 
      className={classes.modal}
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DeleteModal>
      <div>
        <Title>{'Hapus Lowongan'}</Title>
        <ColumnContainer full>
          <Subtitle>
            Apakah anda ingin menghapus lowongan ini?
          </Subtitle>
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
          {postLoading ? <CircularProgress color="inherit" size={20}/> : 'Ya'}
        </Button>
        <Button 
          disabled={postLoading}
          color="primary" 
          style={{width: 100}} 
          onClick={() => toggle('none')}
        >Tidak</Button>
      </ButtonContainer>
      </DeleteModal>
      </Dialog>
    </Backdrop>
  );
};

export default withCookies(DeleteLowongan);
