import { Form, TextValidator } from 'react-native-validator-form';
import React, { Component } from 'react';
import { Button } from 'react-native';
import * as UserService from '../service/user-service'
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                UserID: '',
                Password: '',

            }
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
        console.log("after user login "+res.headers)
    }
    render() {
        const { user } = this.state;
        return (
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