import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

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
    borderRadius: 40,
  },
});

const HomeScreenMainScroll = () => {
  return (
    <ScrollView style={style.scrollContainer}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
        <View style={style.picContainer} />
      ))}
    </ScrollView>
  );
};

export default HomeScreenMainScroll;
