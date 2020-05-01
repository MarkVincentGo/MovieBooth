import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  PanResponder,
  Animated,
  ScrollView,
} from 'react-native';
import Layout from './Layout';
import TopScroll from './HomeScreenTopScroll'

const style = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    padding: 20,
  },
  picContainer: {
    width: '100%',
    height: 380,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
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
      offset: 0,
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
          offset: 40,
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
    return (
      <Layout>
        <View style={styles.content}>
          <Animated.View
            style={[
              { backgroundColor: 'rgba(0,200,200,0.2)', minHeight: 120, flex: 1 },
              { height: this.state.topHeight },
            ]}
          >
            <TopScroll />
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
          {/* Bottom View */}
          <Animated.View
            style={[
              { minHeight: 80, alignItems: 'center' },
              { height: this.state.bottomHeight },
            ]}>
            <ScrollView style={style.scrollContainer}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
                <View style={style.picContainer} />
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
});
