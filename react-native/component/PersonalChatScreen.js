import React, { Component } from 'react'
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native'
import * as MessageService from '../service/message-service'

export default class PersonalChatScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            currentMessage: "",
            socket: null

        }
    }
    componentDidMount() {
        console.log(this.props.socket)
        this.props.socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log("message from server ", data)
            let msgs = this.state.messages
            msgs.push(data)
            MessageService.addMessagetoStore(data)
            this.setState({ messages: msgs }, () => { console.log(this.state.messages) })

        }
        if (this.state.messages.length == 0) {
            this.state.messages = MessageService.getUserMessagesById(this.props.targetUser)
            this.setState({})
        }

    }

    onChangeText(text) {
        this.state.currentMessage = text;
    }

    onMessageSubmit(event) {
        const msg = { senderId: this.props.loggedInUser, receiverId: this.props.targetUser, data: this.state.currentMessage ,date : new Date() }
        this.props.socket.send(JSON.stringify(msg))
        this.state.messages.push(msg)
        MessageService.addMessagetoStore(msg)
        this.messageInput.clear()
        this.setState({})

    }

    render() {
        return (
            <KeyboardAvoidingView enabled>
                <View>
                    <FlatList
                         ref={ref => this.flatList = ref}
                         onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                         onLayout={() => this.flatList.scrollToEnd({animated: true})}
                        style={styles.container}
                        data={this.state.messages}
                        renderItem={({ item, index }) => <Text style={styles.item}>{item.data +"        "+item.date}</Text>}
                         keyExtractor={(item, index) => item.data}
                    />
                </View>
                <View style={{ height: "20%" }}>
                    <TextInput
                        ref={input => { this.messageInput = input }} 
                        multiline={true}
                        placeholder="type your message here ..."
                        onChangeText={text => this.onChangeText(text)}
                    />
                    <Button
                        title="Send"
                        onPress={(e) => this.onMessageSubmit(e)}
                    />
                </View>
            </KeyboardAvoidingView>

        )

    }
}
const styles = StyleSheet.create({
    container: {
        height: "80%"
    },
    item: {
        padding: 10,
        fontSize: 18,
        margin: 10,
        height: 44,
        backgroundColor: '#A2D9CE'
    },
})

