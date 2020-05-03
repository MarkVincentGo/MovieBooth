import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Layout from '../Layout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Camera from './Camera';
import DevelopingImage from '../DevelopingImage';

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
    paddingLeft: 10,
    backgroundColor: 'rgba(225,225,225,0.7)',
    borderRadius: 10,
  },
  scrollContentContainer: {
    alignItems: 'center',
  },
  photoContainer: {
    height: 180,
    aspectRatio: 1,
    marginLeft: 20,
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
      photoData: [[], [], [], []],
      currentPhotoIndex: 0,
      boomCounter: 1,
      goingUp: true,
    };
    this.handleExpandButton = this.handleExpandButton.bind(this);
    this.displayToTopHalf = this.displayToTopHalf.bind(this);
  }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState(prevState => {
    //     if (prevState.boomCounter < 9 && prevState.goingUp) {
    //       return { boomCounter: prevState.boomCounter + 1 };
    //     } else if (prevState.boomCounter === 9 && prevState.goingUp) {
    //       return { boomCounter: prevState.boomCounter - 1, goingUp: false };
    //     } else if (prevState.boomCounter > 0 && !prevState.goingUp) {
    //       return { boomCounter: prevState.boomCounter - 1 };
    //     } else if (prevState.boomCounter === 0 && !prevState.goingUp) {
    //       return { boomCounter: prevState.boomCounter + 1, goingUp: true };
    //     }
    //   });
    // }, 50);
  }

  handleExpandButton() {
    const { fullScreenCamera } = this.state;
    this.setState({ fullScreenCamera: !fullScreenCamera });
  }

  displayToTopHalf(photo) {
    const { photoData, currentPhotoIndex } = this.state;
    if (currentPhotoIndex < photoData.length) {
      photoData[currentPhotoIndex] = photo;
      this.setState({ photoData, currentPhotoIndex: currentPhotoIndex + 1 },() => console.log(this.state.photoData));
    }
  }

  render() {
    const { fullScreenCamera, photoData, boomCounter } = this.state;
    return (
      <Layout>
        <View style={style.stripContainer}>
          <ScrollView
            style={style.scrollContainer}
            horizontal
            contentContainerStyle={style.scrollContentContainer}
            showsHorizontalScrollIndicator={false}
            snapToAlignment={'start'}>
            {photoData.map(photo => {
              return !photo.length ? (
                <View>
                  <View style={[style.photoContainer, {backgroundColor: 'black'}]} />
                </View>
              ) : (
                <View>
                  <Image
                    key={photo}
                    source={photo[boomCounter % 10]}
                    style={style.photoContainer}
                  />
                  <DevelopingImage style={style.photoContainer} />
                </View>
              );
            })}
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
