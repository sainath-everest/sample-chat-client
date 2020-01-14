import React, { Component } from 'react';
import SignuUp from './SingUp'
import ChatBoard from './ChatBoard'
import SignIn from './SignIn'
import PersonalChatScreen from './PersonalChatScreen'
import DashBoard from './DashBoard'
import { createAppContainer , createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthLoadingScreen from './AuthLoadingScreen'


const AppStack = createStackNavigator({
  ChatBoard : {screen  : ChatBoard},
  PersonalChatScreen : { screen : PersonalChatScreen}
});
const AuthStack = createStackNavigator({
  DashBoard: { screen: DashBoard },
  SignIn: { screen: SignIn },
  SignuUp : { screen : SignuUp },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

// const App = createAppContainer(MainNavigator);
// export default App;




