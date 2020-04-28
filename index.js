/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import App from './App';
import {name as appName} from './app.json';
import Login from './appComponents/Login';

const theme = {
  colors: {
    primary: 'white',
  },
};

const Main = () => (
  <ThemeProvider theme={theme}>
    <Login />
  </ThemeProvider>
)

AppRegistry.registerComponent(appName, () => Main);
