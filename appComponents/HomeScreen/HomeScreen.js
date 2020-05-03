import React, { Component } from 'react';
import Layout from '../Layout';
import TopScroll from './HomeScreenTopScroll';
import MainScroll from './HomeScreenMainScroll';
import { topScrollIcons } from './HomeScreenIcons';
import {
  StyleSheet,
  View,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';

const style = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
});

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topHeight: 40, // min height for top pane header
      bottomHeight: Dimensions.get('window').height - 200, // min height for bottom pane header,
      deviceHeight: Dimensions.get('window').height,
      isDividerClicked: false,
      pan: new Animated.ValueXY(),
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Initially, set the Y position offset when touch start
      onPanResponderGrant: (e, gestureState) => {
        this.setState({
          isDividerClicked: true,
        });
      },

      // When we drag the divider, set the bottomHeight (component state) again.
      onPanResponderMove: (e, gestureState) => {
        this.setState({
          bottomHeight:
            gestureState.moveY > this.state.deviceHeight - 40
              ? 40
              : this.state.deviceHeight - gestureState.moveY - 40,
        });
      },

      onPanResponderRelease: (e, gestureState) => {
        // Do something here for the touch end event
        this.setState({
          isDividerClicked: false,
        });
      },
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <Layout>
        <View style={style.content}>
          <Animated.View
            style={[
              { backgroundColor: 'rgba(0,200,200,0.2)', minHeight: 120, flex: 1 },
              { height: this.state.topHeight },
            ]}>
            <TopScroll navigation={navigation} icons={topScrollIcons} />
          </Animated.View>
          <View
            style={[
              { height: 15 },
              this.state.isDividerClicked
                ? { backgroundColor: '#777' }
                : { backgroundColor: '#e2e2e2' },
            ]}
            {...this._panResponder.panHandlers}
          />
          <Animated.View
            style={[
              { minHeight: 80, alignItems: 'center' },
              { height: this.state.bottomHeight },
            ]}>
            <MainScroll />
          </Animated.View>
        </View>
      </Layout>
    );
  }
}
