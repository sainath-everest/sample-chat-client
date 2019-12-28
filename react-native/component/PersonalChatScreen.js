import React, { Component } from 'react'
import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import WS from 'react-native-websocket'
import * as UserService from '../service/user-service'
import * as MessageService from '../service/user-service'

export default class PersonalChatScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: "sai",
            messages: ["a", "b"],
            currentMessage: "",
            socket: null

        }
    }
    async componentDidMount() {
        if (this.state.socket == null) {
            const connection = await UserService.geScocketConnection()
            this.state.socket = connection

        }

        this.state.socket.onopen = () => {
            this.state.socket.onmessage = (event) => {
                this.state.messages.push(event.data)
                this.setState({})

            }
        }


    }

    onChangeText(text) {
        this.state.currentMessage = text;
    }

    onMessageSubmit(event) {
        const msg = { ID: "suresh", Data: this.state.currentMessage }
        this.state.socket.send(JSON.stringify(msg))
        this.state.messages.push(this.state.currentMessage)
        this.setState({})

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


            </View>

        )

    }
}

