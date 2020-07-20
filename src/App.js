import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import Auth from './Auth'
import { CookiesProvider, withCookies } from 'react-cookie';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};


class App extends Component {
  
  render() {
    console.log('this.props.cookies.jwttoken: ', this.props.allCookies)
    return (
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <Router history={browserHistory}>
            {!this.props.allCookies.user ? <Auth /> :
              !this.props.allCookies.user.jwttoken ? <Auth /> :
                this.props.allCookies.user.jwttoken !== '' ?
              < Routes /> :
              <Auth />}
          </Router>
        </CookiesProvider>
      </ThemeProvider>
    );
  }
}

export default withCookies(App)