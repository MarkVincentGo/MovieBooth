import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  fadeInView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
  },
});

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 8000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default props => {
  return (
    <View style={[{ ...props.style }, style.container]}>
      <FadeInView style={style.fadeInView} />
    </View>
  );
};
