/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TestingScreen from './TestingScreen';

AppRegistry.registerComponent(appName, () => TestingScreen);
