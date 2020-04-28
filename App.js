import React, { Component } from 'react';
import { View, ImageBackground, Text, ScrollView, SafeAreaView } from 'react-native';
import CameraPreview from './appComponents/Camera.js';
import PhotoStrip from './appComponents/PhotoStrip.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      photoData: [null, null, null, null],
      currentPhotoIndex: 0,
    };
  }

  render() {
    const { photoData } = this.state;
    return (
      <SafeAreaView style={style.mainView}>
        <PhotoStrip photos={photoData} />
        <View style={style.bottomHalf}>
          <CameraPreview storePic={this.displayToTopHalf.bind(this)} />
        </View>
      </SafeAreaView>
    );
  }

  displayToTopHalf(photo) {
    const { photoData, currentPhotoIndex } = this.state;
    console.log(photoData)
    if (currentPhotoIndex < photoData.length) {
      photoData[currentPhotoIndex] = { uri: photo };
      this.setState({ photoData, currentPhotoIndex: currentPhotoIndex + 1 });
    }
  }
};

const style = {
  mainView: {
    flex: 1,
    alignItems: 'center',
  },
  bottomHalf: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
};
