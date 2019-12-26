import { Form, TextValidator } from 'react-native-validator-form';
import React, { Component } from 'react';
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
    handleSubmit = async () => {
        console.log("before user login "+this.state.user)
        const res = await UserService.registration(this.state.user)
        console.log("after user login "+res)
    }
    render() {
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