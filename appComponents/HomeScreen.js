import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Layout from './Layout';

const style = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: '100%',
    width: '98%',
    borderWidth: 1,
    borderColor: 'black',
  },
  picContainer: {
    width: '100%',
    height: 380,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 5,
  },
});

export default class HomeScreen extends Component {
  render() {
    return (
      <Layout>
        <ScrollView style={style.scrollContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <View style={style.picContainer}/>
          ))}
        </ScrollView>
      </Layout>
    )
  }
}
