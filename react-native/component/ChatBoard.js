import React, { Component } from 'react'
import { AppRegistry, Text, View, ScrollView, StyleSheet, FlatList } from 'react-native'
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
        {this.state.targetUser != "" ? <PersonalChatScreen
          targetUser={this.state.targetUser}
          socket={this.props.socket} /> :

          <FlatList
            keyExtractor={(item, index) => item}
            data={this.state.friendList}
            renderItem={({ item, index }) =>
              <View style={styles.separator}>
                <Text
                  style={styles.item}
                  onPress={(e) => this.onTextPress(e, item)}>{item}
                </Text>
              </View>}
          />
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  item: {
    padding: 10,
    fontSize: 18,
    margin: 10,
    height: 44
  },
  separator: {
    borderWidth: 0.25
  },
})