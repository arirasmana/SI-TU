  import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertMessage = (props) => {
  const {status, description, notif, handleClose} = props;
  return (
    <Snackbar 
      open={notif} 
      autoHideDuration={6000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
      <Alert onClose={handleClose} severity={status}>
        {description}
      </Alert>
    </Snackbar>
  )
}

export default AlertMessage