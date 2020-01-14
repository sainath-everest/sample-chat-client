import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import *as DatabaseService from '../service/database-service'
const Realm = require('realm');

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapRealm();
  }
  _bootstrapRealm = async () => {
      console.log("in _bootstrapRealm")
    const userLoginInfo = await DatabaseService.getUserLoginfo()
    console.log("userLoginInfo ",userLoginInfo)
    this.props.navigation.navigate(userLoginInfo!==null? 'App': 'Auth');
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}