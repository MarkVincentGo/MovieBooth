import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
  scrollContainer: {
    height: '90%',
    borderColor: 'black',
    borderWidth: 3,
  },
  iconContainer: {
    height: 100,
    width: 100,
    marginLeft: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
});

const HomeScreenTopScroll = () => {
  return (
    <ScrollView style={style.scrollContainer} horizontal contentContainerStyle={{ alignItems: 'center',}}>
      {[1,2,3,4,5,6,7,8,9].map(() => (
        <View style={style.iconContainer} />
      ))}
    </ScrollView>
  )
}

export default HomeScreenTopScroll
