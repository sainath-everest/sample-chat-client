import React, { Component } from 'react'
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native'
import * as MessageService from '../service/message-service'
import SignOut from './SignOut';

export default class PersonalChatScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            currentMessage: "",
            socket: null,
            needToSingOut : false

        }
    }
    componentDidMount() {
        console.log(this.props.socket)
        this.props.socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log("message from server ", data)
            let msgs = this.state.messages
            msgs.push(data)
            MessageService.addMessagetoStore(data.senderId,data)
            this.setState({ messages: msgs })

        }
        if (this.state.messages.length == 0) {
            console.log("test  ")
            this.state.messages = JSON.parse(JSON.stringify(MessageService.getUserMessagesById(this.props.targetUser)))
            this.setState({})
        }

    }

    onChangeText(text) {
        this.state.currentMessage = text;
    }

    onMessageSubmit(event) {
        const msg = {
            senderId: this.props.loggedInUser,
            receiverId: this.props.targetUser,
            data: this.state.currentMessage,
            date: new Date().toLocaleString(),
            messageType: "outgoing"
        }

        this.props.socket.send(JSON.stringify(msg))
        this.state.messages.push(msg)
        MessageService.addMessagetoStore(msg.senderId,msg)
        this.messageInput.clear()
        this.setState({})

    }
    doSignOut(){
        this.setState({needToSingOut : true})

    }

    render() {
        return (
            <View>
                {this.state.needToSingOut ? <SignOut socket = {this.props.socket} /> :
           
            <KeyboardAvoidingView enabled>
                <View>
                    <FlatList
                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                        onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                        style={styles.container}
                        data={this.state.messages}
                        renderItem={({ item, index }) =>
                        <Text style={[styles.item, item.messageType === 'incoming' ? styles.incoming : styles.outgoing]}>
                            <Text style = {styles.message}>{item.data+"    "}</Text>
                            <Text style = {styles.date}>{item.date}</Text>
                        </Text>}
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
                     <Button
                        title="SigOut"
                        color="#A2D9CE"
                        onPress={() => this.doSignOut()}
                    />
                    
                </View>
               
               
                
            </KeyboardAvoidingView>
    }
            </View>

        )

    }
}
const styles = StyleSheet.create({
    container: {
        height: "80%",
    },
    item: {
        margin: 10,
        padding: 10,
        maxWidth: "90%"
    },
    message : {
        fontSize: 18,
    },
    date : {
        fontSize: 12, 

    },
    outgoing: {
        backgroundColor: '#FFC0CB',
        alignSelf: 'flex-end'
       
    },
    incoming: {
        backgroundColor: '#A2D9CE',
        alignSelf: 'flex-start'
       
       
    },
})

