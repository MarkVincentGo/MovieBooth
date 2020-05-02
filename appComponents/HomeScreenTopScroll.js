import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const style = StyleSheet.create({
  scrollContainer: {
    height: '90%',
    borderColor: 'black',
    borderWidth: 3,
  },
  iconContainer: {
    height: '80%',
    aspectRatio: 1,
    maxWidth: '90%',
    marginLeft: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
});

const icons = [
  {
    name: 'take picture',
    icon: 'camera-retro',
  }
]

const HomeScreenTopScroll = ({ navigation }) => {
  return (
    <ScrollView 
      style={style.scrollContainer}
      horizontal
      contentContainerStyle={{ alignItems: 'center' }}>
      {[1,2,3,4,5,6,7,8,9].map(() => (
        <View style={style.iconContainer}>
          <Icon name={'camera-retro'} size={100} onPress={() => navigation.navigate('camera')}/>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreenTopScroll;
