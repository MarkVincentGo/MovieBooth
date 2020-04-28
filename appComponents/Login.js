import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import Layout from './Layout';

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '75%',
    marginBottom: 15,
  },
  inputContainer: {
    borderColor: 'white',
  },
  input: {
    color: 'white',
    paddingLeft: 15,
  },
});

export default class Login extends Component {
  render() {
    return (
      <Layout>
        <View style={style.wrapper}>
          {['username', 'password'].map(field => (
            <Input
              key={field}
              placeholder={field}
              leftIcon={<Icon name="user" size={24} color="white" />}
              containerStyle={style.container}
              inputContainerStyle={style.inputContainer}
              inputStyle={style.input}
              placeholderTextColor="#e1e1e1"
            />
          ))}
          <Button title="Login" type="clear" />
          <Button title="Sign Up" type="clear" />
        </View>
      </Layout>
    );
  }
}
