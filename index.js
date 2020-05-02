/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import App from './App';
import {name as appName} from './app.json';
import Login from './appComponents/Login';
import CameraScreen from './appComponents/CameraScreen';
import HomeScreen from './appComponents/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './appComponents/Navigation'


const theme = {
  colors: {
    primary: 'white',
  },
};

const Main = () => (
  <ThemeProvider theme={theme}>
    <Navigation />
  </ThemeProvider>
);

AppRegistry.registerComponent(appName, () => Main);
