import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from './Layout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from './Camera';

const style = StyleSheet.create({
  cameraView: expanded => ({
    position: 'absolute',
    height: expanded ? '90%' : 350,
    bottom: '10%',
    width: expanded ? '100%' : '90%',
    borderRadius: 30,
    overflow: 'hidden',
  }),
  expandIcon: {
    position: 'absolute',
    top: 30,
    right: 30,
  }
});

export default class CameraScreen extends Component {
  constructor() {
    super();
    this.state = {
      fullScreenCamera: false,
    };
    this.handleExpandButton = this.handleExpandButton.bind(this);
  }

  handleExpandButton() {
    const { fullScreenCamera } = this.state;
    this.setState({ fullScreenCamera: !fullScreenCamera });
    console.log('pressed')
  }

  render() {
    const { fullScreenCamera } = this.state;
    return (
      <Layout>
        <Text>Hi</Text>
        <View style={style.cameraView(fullScreenCamera)}>
          <Camera />
          <Icon
            name={'arrow-expand'}
            color="white"
            size={24}
            style={style.expandIcon}
            onPress={this.handleExpandButton}
          />
        </View>
      </Layout>
    );
  }
}
