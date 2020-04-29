import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraRoll from "@react-native-community/cameraroll";


export default class ExampleApp extends PureComponent {
  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
  }
  render() {
    const { flash } = this.props;
    return (
      <View style={style.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={style.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={flash}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture} style={style.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    const { storePic } = this.props;
    if (this.camera) {
      const options = { quality: 0.2, base64: true };
      const data = await this.camera.takePictureAsync(options);
      // storePic(data.uri);
      CameraRoll.saveToCameraRoll(data.uri, 'photo');
    }
  };
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
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
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 30,
  },
});
