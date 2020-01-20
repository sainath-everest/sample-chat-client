import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import PersonalChatScreen from './PersonalChatScreen'
import * as UserService from '../service/user-service'
import * as DatabaseService from '../service/database-service'

export default class ChatBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
      targetUser: "",
      socket: null,
      userLoginInfo: null
    }
  }
  componentDidMount() {
    this.getUserLoginfo()
  }
  getUserLoginfo = async () => {
    const userLoginInfo = await DatabaseService.getUserLoginfo()
    this.state.userLoginInfo = userLoginInfo
    this.getAllUsers()
   
   

  }
  getAllUsers = async () => {
    console.log("test2 ",this.state.userLoginInfo)

    const users = await UserService.getAllUsers(this.state.userLoginInfo ? this.state.userLoginInfo.userId : this.props.navigation.state.params.loggedInUser)
    this.setState({ friendList: users.data })

  }

  onTextPress = async (event, data) => {
    console.log(data);
    this.state.targetUser = data
    if (this.state.userLoginInfo) {
      await this.intiateWebsocketConnection(this.state.userLoginInfo.token)
    }
    console.log("test ",this.state.socket)
    this.props.navigation.navigate('PersonalChatScreen', {
      socket: this.state.userLoginInfo ? this.state.socket : this.props.navigation.state.params.socket,
      loggedInUser: this.state.userLoginInfo ? this.state.userLoginInfo.userId : this.props.navigation.state.params.loggedInUser,
      targetUser: this.state.targetUser


    })
  }
  intiateWebsocketConnection = async (token) => {
    if (this.state.socket == null) {
      const connection = await UserService.geScocketConnection(this.state.userLoginInfo.userId, token, this.updateConnection)
      this.updateConnection(connection);
    }
  }
  updateConnection = (connection) => {
    console.log("new conn", connection);
    this.setState({ socket: connection })

  }

  render() {
    return (
      <View >
        <FlatList
          keyExtractor={(item, index) => item}
          data={this.state.friendList}
          renderItem={({ item, index }) =>
            <View style={styles.separator}>
              <Text
                style={styles.item}
                onPress={(e) => this.onTextPress(e, item.UserID)}>{item.FirstName}
              </Text>
            </View>}
        />

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