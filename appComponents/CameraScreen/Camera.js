import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Promise from 'bluebird';
// import CameraRoll from "@react-native-community/cameraroll";

export default class ExampleApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flashOn: false,
      backCamera: true,
      boomerangRepeats: 0,
      boomerangArray: [],
    };
    this.takePicture = this.takePicture.bind(this);
    this.handleFlashButton = this.handleFlashButton.bind(this);
    this.switchCameraButton = this.switchCameraButton.bind(this);
    this.takeBoomerang = this.takeBoomerang.bind(this)
  }

  handleFlashButton() {
    const { flashOn } = this.state;
    this.setState({ flashOn: !flashOn });
  }

  switchCameraButton() {
    const { backCamera } = this.state;
    this.setState({ backCamera: !backCamera });
  }

  takePicture = () => {
    const { storePic } = this.props;
    const photoArray = [];
    if (this.camera) {
      const options = { quality: 0.1, skipProcessing: true, };
      this.camera.takePictureAsync(options)
        .then(data => {
          // storePic(data.uri)
        })
      //storePic(data.uri);
      // CameraRoll.saveToCameraRoll(data.uri, 'photo');
    }
  };

  takeBoomerang() {
    const { boomerangRepeats, boomerangArray } = this.state;
    const { storePic } = this.props;
    if (boomerangRepeats < 10) {
      setTimeout(() => {
        this.camera.takePictureAsync({ quality: 0.1 }).then(data => {
          boomerangArray.push({ uri: data.uri });
          this.setState(prevState => ({
            boomerangRepeats: prevState.boomerangRepeats + 1,
            boomerangArray,
          }));
        });
      }, 50);
    } else {
      console.log(boomerangArray);
      storePic(boomerangArray);
      this.setState({ boomerangRepeats: 0, boomerangArray: [] });
    }
  }

  render() {
    const { flashOn, backCamera } = this.state;
    return (
      <View style={style.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={style.preview}
          autoFocus={RNCamera.Constants.AutoFocus.off}
          type={RNCamera.Constants.Type[backCamera ? 'back' : 'front']}
          flashMode={RNCamera.Constants.FlashMode[flashOn ? 'on' : 'off']}
          captureAudio={false}
          onPictureTaken={this.takeBoomerang}>
          <TouchableOpacity onPress={this.takePicture} style={style.capture}>
            <Icon
              name={'camera'}
              color="black"
              size={30}
              onPress={this.takePicture}
            />
          </TouchableOpacity>
        </RNCamera>
        <Icon
          name={flashOn ? 'flash' : 'flash-outline'}
          color="white"
          size={30}
          style={style.flashIcon}
          onPress={this.handleFlashButton}
        />
        <Icon
          name={'camera-switch'}
          color="white"
          size={30}
          style={style.switchCameraIcon}
          onPress={this.switchCameraButton}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 75,
    padding: 16,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 30,
  },
  flashIcon: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
  switchCameraIcon: {
    position: 'absolute',
    top: 30,
    left: 70,
  },
});
