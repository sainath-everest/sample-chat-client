
import React, { Component } from 'react';
import SignuUp from './SingUp'
import ChatBoard from './ChatBoard'
import SignIn from './SignIn'
import  SocketConnection from './SocketConnection'  
import { View } from 'react-native'
import PersonalChatScreen from './PersonalChatScreen'
import Test from './Test';



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
       <SignIn /> 
   
    </View>
    );
  }
};


