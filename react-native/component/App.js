
import React, { Component } from 'react';
import SignuUp from './SingUp'
import ChatBoard from './ChatBoard'
import SignIn from './SignIn'
import  SocketConnection from './SocketConnection'  
import { View } from 'react-native'
import PersonalChatScreen from './PersonalChatScreen'


export default class App extends Component {

  render() {
    return (
      <View>
        {/* {/* <SocketConnection  />
        <SignuUp />
        <SignIn /> 
        <PersonalChatScreen 
           <Test/>
       <ChatBoard /> */}
       <ChatBoard /> 
   
    </View>
    );
  }
};


