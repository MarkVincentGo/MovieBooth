import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const style = StyleSheet.create({
  scrollContainer: {
    height: 200,
  },
  scrollContentContainer: {
    alignContent: 'center',
  },
  iconContainer: {
    height: '100%',
    position: 'relative',
    bottom: 0,
    aspectRatio: 1,
    maxWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

const HomeScreenTopScroll = ({ navigation, icons }) => {
  return (
    <ScrollView
      style={style.scrollContainer}
      horizontal
      contentContainerStyle={style.scrollContentContainer}
      showsHorizontalScrollIndicator={false}
      snapToInterval={200}
      snapToAlignment={'start'}>
      {icons.map(icon => (
        <TouchableOpacity
          style={style.iconContainer}
          onPress={() => navigation.navigate(icon.navigateTo)}
          activeOpacity={0.6}>
          <Icon name={icon.icon} size={60} />
          <Text>{icon.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HomeScreenTopScroll;
