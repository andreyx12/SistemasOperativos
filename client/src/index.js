import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from "react-redux";
import store from '../src/components/Redux/Store/index';
import './index.css';
import SocketIO from '../src/components/Utils/Socketio';

const theme = createMuiTheme({
  palette: {
      primary: {
        main: '#43a047',
        contrastText: '#fff',
      },
      secondary: {
        main: '#ff1744',
        contrastText: '#fff',
      },
  },
  status: {
    danger: 'orange',
  },
});

SocketIO();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
        <AppRouter />
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();