import { Form, TextValidator } from 'react-native-validator-form';
import React, { Component } from 'react';
import { Button ,View} from 'react-native';
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
            isUserLoginSuccess : false,
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
        console.log("before user login "+this.state.user)
        const res = await UserService.signin(this.state.user)
        let status = res.data === 'success' ? true : false
        this.state.isUserLoginSuccess = status;
        if(this.state.isUserLoginSuccess){
            this.intiateWebsocketConnection()
        }
        this.setState({})
       
    }
    intiateWebsocketConnection = async () => {
        if (this.state.socket == null) {
            const connection = await UserService.geScocketConnection()
            this.setState({socket:connection} , () => {console.log(this.state)})
        }

    }
    render() {
        const { user } = this.state;
   
        return (
            this.state.isUserLoginSuccess ? <ChatBoard  socket = {this.state.socket}/>:
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
            
        )

    }

}