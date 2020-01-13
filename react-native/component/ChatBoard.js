import React, { Component } from 'react'
import {Text, View , StyleSheet, FlatList } from 'react-native'
import PersonalChatScreen from './PersonalChatScreen'
import * as UserService from '../service/user-service'

export default class ChatBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendList: [],
      targetUser: "",
      socket: null
    }
  }
  componentDidMount() {
   this.getAllUsers()
    
  }
  getAllUsers =  async () => {
    users = await UserService.getAllUsers(this.props.navigation.state.params.loggedInUser)
    this.setState({friendList:users.data})
   
  }

  onTextPress = (event, data) => {
    console.log(data);
    this.state.targetUser = data
    this.props.navigation.navigate('PersonalChatScreen',{
      socket : this.props.navigation.state.params.socket,
      loggedInUser : this.props.navigation.state.params.loggedInUser,
      targetUser : this.state.targetUser

    })      
  }

  render() {
   // const {navigate} = this.props.navigation;
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