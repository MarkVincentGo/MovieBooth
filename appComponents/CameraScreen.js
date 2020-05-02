import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Layout from './Layout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Camera from './Camera';
import HomeScreenTopScroll from './HomeScreenTopScroll';

const style = StyleSheet.create({
  stripContainer: {
    height: 250,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingLeft: 15,
    marginRight: 500,
  },
  iconContainer: {
    height: 200,
    aspectRatio: 1,
    marginLeft: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  cameraView: expanded => ({
    position: 'absolute',
    height: expanded ? '85%' : 'auto',
    bottom: '15%',
    width: expanded ? '90%' : '90%',
    aspectRatio: expanded ? null : 1,
    borderRadius: 30,
    overflow: 'hidden',
  }),
  expandIcon: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
});

export default class CameraScreen extends Component {
  constructor() {
    super();
    this.state = {
      fullScreenCamera: false,
      flash: false,
    };
    this.handleExpandButton = this.handleExpandButton.bind(this);
  }

  handleExpandButton() {
    const { fullScreenCamera } = this.state;
    this.setState({ fullScreenCamera: !fullScreenCamera });
  }

  render() {
    const { fullScreenCamera, flash } = this.state;
    return (
      <Layout>
        <View style={{height: 250, borderWidth: 1, borderColor: 'black', width: '100%'}}>
          <ScrollView 
            style={style.scrollContainer}
            horizontal
            contentContainerStyle={{ alignItems: 'center' }}>
            {[1,2,3,4].map(() => (
              <View style={style.iconContainer}>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={style.cameraView(fullScreenCamera)}>
          <Camera flash={flash} />
          <Icon
            name={'arrow-expand'}
            color="white"
            size={30}
            style={style.expandIcon}
            onPress={this.handleExpandButton}
          />
        </View>
      </Layout>
    );
  }
}
