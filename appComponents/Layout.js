import React from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');
// Later on in your styles..
var style = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: height,
    opacity: 0.8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height,
    width,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  pop: {
    flex: 1,
  },
});

const Layout = props => (
  <SafeAreaView style={style.pop}>
    <Video
      source={require('../homeBackground.mp4')}
      ref={ref => {
        this.player = ref;
      }}
      onBuffer={this.onBuffer}
      onError={this.videoError}
      repeat
      style={style.backgroundVideo}
      ignoreSilentSwitch={'obey'}
      resizeMode={'stretch'}
    />
    <View style={style.overlay} />
    {props.children}
  </SafeAreaView>
);

export default Layout;
