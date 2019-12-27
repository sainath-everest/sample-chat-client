import React, { Component } from 'react'
import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import WS from 'react-native-websocket'

export default class PersonalChatScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: "sai",
            incomingMessages: [],
            outgoingMessages: [],
            messages: ["a" ,"b"],
            currentMessage: "",
            needToSendMessage: false

        }
    }

    componentDidMount() {
        // this.props.socket.onMessage = (e) => {
        //     console.log("recieved ", e.data)
        // }
    }

    onChangeText(text) {
        this.state.messages.push(text)
        this.state.currentMessage = text;
    }
    onMessageSubmit(event) {
        console.log("before message submit ",this.props.socket)
        const msg = { ID: "suresh", Data: this.state.currentMessage }
        this.props.socket.send(JSON.stringify(msg))
    }
    onMessageReceived(recievedMessage) {
        this.state.messages.push(recievedMessage)
    }
    
    render() {
        return (
            <View>
                    {this.state.messages.map((item, key) => (
                        <Text >{item}</Text>
                    ))}
                <TextInput
                    multiline={true}
                    placeholder="type your message here ..."
                    onChangeText={text => this.onChangeText(text)}
                />
                <Button
                    title="Send"
                    onPress={(e) => this.onMessageSubmit(e)}
                />

                <Button
                    title="Reset"
                    onPress={(e) => this.props.resetTargetUser()}
                />
            </View>

        )

    }
}