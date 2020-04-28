import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import styled from 'styled-components';

const style = {
  stripContainer: {
    flex: 1,
    height: 800,
    width: 200,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  singlePicture: {
    height: 180,
    width: 180,
    borderWidth: 1,
    borderColor: '#000',
  },
};


export default ({ photos }) => {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={style.stripContainer}>
        {photos.map((pic, i) => (
            <Image source={photos[i]} style={style.singlePicture} />
        ))}
      </View>
    </ScrollView>
  );
};
