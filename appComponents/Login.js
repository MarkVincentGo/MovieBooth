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
  inputBackground: {
    width: '80%',
    height: 250,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    justifyContent: 'center',
  },
  outerContainer: {
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
          <View style={style.inputBackground}>
            {[
              { type: 'username', icon: 'user' },
              { type: 'password', icon: 'lock' },
            ].map(field => (
              <Input
                key={field}
                placeholder={field.type}
                leftIcon={<Icon name={field.icon} size={24} color="white" />}
                containerStyle={style.outerContainer}
                inputContainerStyle={style.inputContainer}
                inputStyle={style.input}
                placeholderTextColor="#e1e1e1"
              />
            ))}
            <Button title="Login" type="clear" />
            <Button title="Sign Up" type="clear" />
          </View>
        </View>
      </Layout>
    );
  }
}
