
import React, { Component } from 'react';
import SignuUp from './SingUp'
import ChatBoard from './ChatBoard'
import SignIn from './SignIn'
import { View } from 'react-native'
import PersonalChatScreen from './PersonalChatScreen'
import Test from './Test';
import DashBoard from './DashBoard'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignOut from './SignOut'


const MainNavigator = createStackNavigator({
  DashBoard: { screen: DashBoard },
  SignIn: { screen: SignIn },
  SignuUp : { screen : SignuUp },
  SignOut :{ screen : SignOut },
  ChatBoard : {screen  : ChatBoard},
  PersonalChatScreen : { screen : PersonalChatScreen}
});

const App = createAppContainer(MainNavigator);

export default App;




