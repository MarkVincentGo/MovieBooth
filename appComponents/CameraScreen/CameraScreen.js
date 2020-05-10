import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Layout from '../Layout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Camera from './Camera';
import DevelopingImage from '../DevelopingImage';
import Video, { FilterType } from 'react-native-video';

const style = StyleSheet.create({
  stripContainer: {
    height: 200,
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
      boomCounter: 0,
      goingUp: true,
      videoData: [null, null, null, null],
    };
    this.handleExpandButton = this.handleExpandButton.bind(this);
    this.displayToTopHalf = this.displayToTopHalf.bind(this);
    this.displayVideo = this.displayVideo.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => {
        if (prevState.boomCounter < 25 && prevState.goingUp) {
          return { boomCounter: prevState.boomCounter + 2.5 };
        } else if (prevState.boomCounter === 25 && prevState.goingUp) {
          return { boomCounter: prevState.boomCounter - 2.5, goingUp: false };
        } else if (prevState.boomCounter > 0 && !prevState.goingUp) {
          return { boomCounter: prevState.boomCounter - 2.5 };
        } else if (prevState.boomCounter === 0 && !prevState.goingUp) {
          return { boomCounter: prevState.boomCounter + 2.5, goingUp: true };
        }
      });
    }, 80);
  }

  handleExpandButton() {
    const { fullScreenCamera } = this.state;
    this.setState({ fullScreenCamera: !fullScreenCamera });
  }

  displayToTopHalf(photo) {
    const { photoData, currentPhotoIndex } = this.state;
    if (currentPhotoIndex < photoData.length) {
      photoData[currentPhotoIndex] = photo;
      this.setState(
        { photoData, currentPhotoIndex: currentPhotoIndex + 1 },
        () => console.log(this.state.photoData),
      );
    }
  }

  displayVideo(video) {
    const { videoData, currentPhotoIndex } = this.state;
    if (currentPhotoIndex < videoData.length) {
      videoData[currentPhotoIndex] = video;
      this.setState(
        { videoData, currentPhotoIndex: currentPhotoIndex + 1 },
        () => console.log(this.state.videoData),
      );
    }
  }

  render() {
    const { fullScreenCamera, photoData, boomCounter, videoData } = this.state;
    return (
      <Layout>
        <View style={style.stripContainer}>
          <ScrollView
            style={style.scrollContainer}
            horizontal
            contentContainerStyle={style.scrollContentContainer}
            showsHorizontalScrollIndicator={false}
            filter={FilterType.MONOCHROME}
            snapToAlignment={'start'}>
            {videoData.map((video, player) => {
              return !video ? (
                <View>
                  <View
                    style={[style.photoContainer, { backgroundColor: 'black' }]}
                  />
                </View>
              ) : (
                <View>
                  {/* <Image
                    key={photo}
                    source={photo[boomCounter % 10]}
                    style={style.photoContainer}
                  /> */}
                  <Video
                    source={{ uri: video }}
                    ref={ref => {
                      this[player] = ref;
                    }}
                    onBuffer={this.onBuffer}
                    onError={this.videoError}
                    repeat
                    style={style.photoContainer}
                    ignoreSilentSwitch={'obey'}
                    resizeMode={'cover'}
                    maxBitRate={2000000}
                    onLoad={() => {
                      setInterval(() => {
                        if (this[player]) {
                          this[player].seek(this.state.boomCounter / 10, 0);
                        }
                      }, 80);
                    }}
                    paused={true}
                  />
                  <DevelopingImage style={style.photoContainer} />
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={style.cameraView(fullScreenCamera)}>
          <Camera
            storePic={this.displayToTopHalf}
            storeVid={this.displayVideo}
          />
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
