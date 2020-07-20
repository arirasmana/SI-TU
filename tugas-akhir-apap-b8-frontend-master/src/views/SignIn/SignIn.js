import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useCookies } from 'react-cookie';
import { BACKEND } from '../../utils'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';


import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    marginTop: 50,
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;
  const classes = useStyles();
  const mainHistory = useHistory()
  const [postLoading, setPostLoading] = useState(false)
  
  const [user, setUser] = useCookies(['user']);
  
  const [dataState, setDataState] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState({
    isValid: false,
    username: false,
    password: false,
    message: ''
  })


  



  // useEffect(() => {
  //   const errors = validate(formState.values, schema);

  //   setFormState(formState => ({
  //     ...formState,
  //     isValid: errors ? false : true,
  //     errors: errors || {}
  //   }));
  // }, [formState.values]);


  const handleChange = (field, event) => {
    setDataState({
      ...dataState,
      [field]: event.target.value
    })
    setError({
      ...error,
      username: false,
      password: false,
      isValid: error.password !== '' && error.username !== '' ? true : false
    })
  };

  const validation = () => {
    setPostLoading(true)
    axios.post(BACKEND.AUTHENTICATE, {
      username: dataState.username,
      password: dataState.password
    }).then(res => {
      setPostLoading(false)
      setUser('user', res.data, { path: '/' })
      window.location.reload()
      mainHistory.push('/dashboard')
    }).catch(err => {
      setPostLoading(false)
      setError({
        username: true,
        password: true,
        message: 'Username or Password is not correct',
        isValid: false
      })
    })
  }

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Selamat Datang di SI-TU 
                Group B
              </Typography>
              {/* <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body2"
                >
                  Muhammad Riza Fauzi [1806269751]
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Ahmad Baehaqi
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Ari Rasmana
                </Typography>
              </div> */}
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                // onSubmit={validation}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Login
                </Typography>
                <TextField
                  className={classes.textField}
                  error={error.username}
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={e => handleChange('username', e)}
                  type="text"
                  value={dataState.username|| ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={error.password}
                  fullWidth
                  helperText={
                    error.message !== '' && !error.isValid ? error.message : ''
                  }
                  label="Password"
                  name="password"
                  onChange={e => handleChange('password', e)}
                  type="password"
                  value={dataState.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!error.isValid || postLoading}
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={validation}
                >
                  {postLoading ? <CircularProgress color="inherit" size={20}/> : 'LOGIN'}
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
