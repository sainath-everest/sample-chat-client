import React, { Component } from 'react'
import { AppRegistry, Text, View, ScrollView, StyleSheet } from 'react-native'
import WS from 'react-native-websocket'
import * as UserService from '../service/user-service'
import SocketIOClient from 'socket.io-client/dist/socket.io.js'
import io from 'socket.io-client';
import PersonalChatScreen from './PersonalChatScreen'
import SocketConnection from './SocketConnection'
export default class ChatBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: "sai",
      friendList: ["suresh", "srikanth", "santhosh"],
      targetUser: "",
      socket: null
    }
  }
  onTextPress = (event, data) => {
    console.log(data);
    this.setState({ targetUser: data })
  }

  render() {
    return (

      <View >
        {
          this.state.targetUser != "" ? <PersonalChatScreen
            targetUser={this.state.targetUser}
            socket={this.props.socket} /> :

            this.state.friendList.map((item, key) => (
              <Text onPress={(e) => this.onTextPress(e, item)}> {item}  </Text>
            ))
        }

      </View>


    );
  }
}
