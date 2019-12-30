import React, { Component } from 'react'
import {Text, View , StyleSheet, FlatList } from 'react-native'
import PersonalChatScreen from './PersonalChatScreen'
export default class ChatBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
          loggedInUser = {this.props.loggedInUser}
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