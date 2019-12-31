import { Form, TextValidator } from 'react-native-validator-form';
import React, { Component } from 'react';
import { Button, View , StyleSheet ,Text } from 'react-native';
import * as UserService from '../service/user-service'
import ChatBoard from './ChatBoard'
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                UserID: '',
                Password: '',

            },
            isUserLoginSuccess: false,
            isFormSubmitted: false,
            socket: null
        }
    }
    handleUserId = (event) => {
        const { user } = this.state;
        user.UserID = event.nativeEvent.text;
        this.setState({ user });
    }
    handlePassword = (event) => {
        const { user } = this.state;
        user.Password = event.nativeEvent.text;
        this.setState({ user });
    }
    handleSubmit = async () => {
        console.log("before user login " + this.state.user)
        const res = await UserService.signin(this.state.user)
        let status = res.data === 'success' ? true : false
        this.state.isUserLoginSuccess = status;
        this.state.isFormSubmitted = true
        if (this.state.isUserLoginSuccess) {
            this.intiateWebsocketConnection()
        }
        this.setState({})

    }
    intiateWebsocketConnection = async () => {
        if (this.state.socket == null) {
            const connection = await UserService.geScocketConnection(this.state.user.UserID)
            this.setState({ socket: connection }, () => { console.log(this.state) })
        }

    }
    render() {
        const { user } = this.state;
        const {navigate} = this.props.navigation;

        return (
            <View>
                {this.state.isUserLoginSuccess && this.state.isFormSubmitted ? 
                    <ChatBoard socket={this.state.socket} loggedInUser = {this.state.user.UserID}/>
                 : 
                <View>
                    {this.state.isFormSubmitted ? <Text style={styles.text}>The signin failed,Please try agian</Text> : <Text></Text>}
                    <Form
                        ref="form"
                        onSubmit={this.handleSubmit}
                    >
                        <TextValidator
                            name="UserID"
                            label="UserID"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            placeholder="Your UserID"
                            type="text"
                            value={user.UserID}
                            onChange={this.handleUserId}
                        />
                        <TextValidator
                            name="password"
                            label="text"
                            secureTextEntry
                            validators={['required']}
                            errorMessages={['This field is required']}
                            placeholder="Password"
                            type="password"
                            value={user.Password}
                            onChange={this.handlePassword}
                        />
                        <Button
                            title="Submit"
                            onPress={this.handleSubmit}
                        />
                    </Form>
                </View>
            }
            </View>
    
        )

    }

}
const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff0000'
    }
})