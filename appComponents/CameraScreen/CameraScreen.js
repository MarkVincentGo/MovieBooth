import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Layout from '../Layout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Camera from './Camera';

const style = StyleSheet.create({
  stripContainer: {
    height: 230,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingLeft: 15,
  },
  photoContainer: {
    height: 190,
    aspectRatio: 1,
    marginLeft: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  cameraView: expanded => ({
    position: 'absolute',
    height: expanded ? '85%' : 'auto',
    bottom: '20%',
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
      photoData: [null, null, null, null],
      currentPhotoIndex: 0,
    };
    this.handleExpandButton = this.handleExpandButton.bind(this);
    this.displayToTopHalf = this.displayToTopHalf.bind(this);
  }

  handleExpandButton() {
    const { fullScreenCamera } = this.state;
    this.setState({ fullScreenCamera: !fullScreenCamera });
  }

  displayToTopHalf(photo) {
    const { photoData, currentPhotoIndex } = this.state;
    if (currentPhotoIndex < photoData.length) {
      photoData[currentPhotoIndex] = { uri: photo };
      this.setState({ photoData, currentPhotoIndex: currentPhotoIndex + 1 });
    }
  }

  render() {
    const { fullScreenCamera, photoData } = this.state;
    return (
      <Layout>
        <View style={style.stripContainer}>
          <ScrollView
            style={style.scrollContainer}
            horizontal
            contentContainerStyle={{ alignItems: 'center' }}
            snapToAlignment={'start'}>
            {photoData.map(photo => (
              <View>
                <Image source={photo} style={style.photoContainer} />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={style.cameraView(fullScreenCamera)}>
          <Camera storePic={this.displayToTopHalf} />
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