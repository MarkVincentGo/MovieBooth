import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import CameraRoll from "@react-native-community/cameraroll";

export default class ExampleApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flashOn: false,
      backCamera: true,
    };
    this.takePicture = this.takePicture.bind(this);
    this.handleFlashButton = this.handleFlashButton.bind(this);
    this.switchCameraButton = this.switchCameraButton.bind(this);
    this.takeVideo = this.takeVideo.bind(this)
  }

  handleFlashButton() {
    const { flashOn } = this.state;
    this.setState({ flashOn: !flashOn });
  }

  switchCameraButton() {
    const { backCamera } = this.state;
    this.setState({ backCamera: !backCamera });
  }

  takePicture = async () => {
    const { storePic } = this.props;
    if (this.camera) {
      const options = { quality: 0.1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      storePic(data.uri);
      // CameraRoll.saveToCameraRoll(data.uri, 'photo');
    }
  };

  takeVideo() {
    const { storeVid } = this.props;
    if (this.camera) {
      this.camera
        .recordAsync({
          quality: RNCamera.Constants.VideoQuality['480p'],
          maxDuration: 2.5,
          codec: RNCamera.Constants.VideoCodec.HVEC,
          videoBitrate: 2 * 1000,
          mute: true,
        })
        .then(data => storeVid(data.uri));
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
          type={RNCamera.Constants.Type[backCamera ? 'back' : 'front']}
          flashMode={RNCamera.Constants.FlashMode[flashOn ? 'on' : 'off']}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}>
          <TouchableOpacity onPress={this.takeVideo} style={style.capture}>
            <Icon
              name={'camera'}
              color="black"
              size={30}
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
