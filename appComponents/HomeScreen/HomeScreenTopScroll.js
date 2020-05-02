import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const style = StyleSheet.create({
  scrollContainer: {
    height: 200,
    marginLeft: '2%',
  },
  iconContainer: {
    height: '100%',
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
      contentContainerStyle={{ alignItems: 'center' }}
      snapToInterval={200}
      snapToAlignment={"center"}>
      {icons.map(icon => (
        <TouchableOpacity
          style={style.iconContainer}
          onPress={() => navigation.navigate('camera')}
          activeOpacity={0.6}>
          <Icon name={icon.icon} size={60} />
          <Text>{icon.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HomeScreenTopScroll;
