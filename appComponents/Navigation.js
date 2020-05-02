import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen/HomeScreen';
import CameraScreen from './CameraScreen/CameraScreen';

const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
