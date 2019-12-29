
import React, { Component } from 'react';
import SignuUp from './SingUp'
import ChatBoard from './ChatBoard'
import SignIn from './SignIn'
import SocketConnection from './SocketConnection'
import { View } from 'react-native'
import PersonalChatScreen from './PersonalChatScreen'
import Test from './Test';
import DashBoard from './DashBoard'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const MainNavigator = createStackNavigator({
  DashBoard: { screen: DashBoard },
  SignIn: { screen: SignIn },
  SignuUp : { screen : SignuUp }
});

const App = createAppContainer(MainNavigator);

export default App;




