import React, { Component } from 'react'
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native'
import WS from 'react-native-websocket'
import * as UserService from '../service/user-service'
import * as MessageService from '../service/message-service'

export default class PersonalChatScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: "sai",
            messages: [],
            currentMessage: "",
            socket: null

        }
    }
    componentDidMount() {
        // if (this.state.socket == null) {
        //     const connection = await UserService.geScocketConnection()
        //     this.state.socket = connection

        // }
        console.log(this.props.socket)
        // this.props.socket.onopen = () => {
        this.props.socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log("message from server ", data)
            let msgs = this.state.messages
            msgs.push(data)
            MessageService.addMessagetoStore(data)
            this.setState({ messages: msgs }, () => { console.log(this.state.messages) })

        }
        // }
        if (this.state.messages.length == 0) {
            this.state.messages = MessageService.getUserMessagesById(this.props.targetUser)
            this.setState({})
        }

    }

    onChangeText(text) {
        this.state.currentMessage = text;
    }

    onMessageSubmit(event) {
        const msg = { senderId: "sai", receiverId: "suresh", data: this.state.currentMessage }
        this.props.socket.send(JSON.stringify(msg))
        this.state.messages.push(msg)
        MessageService.addMessagetoStore(msg)
        this.setState({})

    }


    render() {
        return (
            <View>
                <FlatList
                        data={this.state.messages}
                        renderItem={({ item }) => <Text style={styles.item}>{item.data}</Text>}
                        keyExtractor={(item, index) => item.data}
                    />
               
                <TextInput
                    multiline={true}
                    placeholder="type your message here ..."
                    onChangeText={text => this.onChangeText(text)}
                />
                <Button
                    title="Send"
                    onPress={(e) => this.onMessageSubmit(e)}
                />
            </View>

        )

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        margin: 10,
        height: 44,
        backgroundColor: '#A2D9CE'
    },
})

