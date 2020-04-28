import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get("window");
// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: height,
    opacity: 0.8,
  },
  pop: {
    flex: 1,
  },
});

export default class TestingScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.pop}>
        <Video 
          source={require('./homeBackground.mp4')}
          ref={(ref) => {
            this.player = ref
          }}  
          onBuffer={this.onBuffer}
          onError={this.videoError}
          repeat
          style={styles.backgroundVideo} 
          ignoreSilentSwitch={"obey"}
          resizeMode={'stretch'}
        />
      </SafeAreaView>
    );
  }
}

