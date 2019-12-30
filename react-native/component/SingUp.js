import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Form, TextValidator } from 'react-native-validator-form';
import * as UserService from '../service/user-service'
import SignIn from './SignIn';
export default class SignuUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                UserID: '',
                FirstName: '',
                LastName: '',
                Password: '',
                ConfirmPassword: ''
            },
            isRegistrationSuccess: false,
            isFormSubmitted: false
        }
    }
    componentWillMount() {
        Form.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }

    handleUserId = (event) => {
        const { user } = this.state;
        user.UserID = event.nativeEvent.text;
        this.setState({ user });
    }
    handleFirstName = (event) => {
        const { user } = this.state;
        user.FirstName = event.nativeEvent.text;
        this.setState({ user });
    }
    handleLastName = (event) => {
        const { user } = this.state;
        user.LastName = event.nativeEvent.text;
        this.setState({ user });
    }
    handlePassword = (event) => {
        const { user } = this.state;
        user.Password = event.nativeEvent.text;
        this.setState({ user });
    }

    handleRepeatPassword = (event) => {
        const { user } = this.state;
        user.ConfirmPassword = event.nativeEvent.text;
        this.setState({ user });
    }

    handleSubmit = async () => {
        console.log("before user registration " + this.state.user)
        const res = await UserService.registration(this.state.user)
        console.log("after user registration " + res.data)
        let status = res.data === 'success' ? true : false
        this.setState({ isRegistrationSuccess: status, isFormSubmitted: true })
    }

    funct = () => {
        return <View>{(this.state.isFormSubmitted) ? <Text>error message</Text> : <Text></Text>}</View>
    }
    render() {
        const { user } = this.state;
        return (
            <View>
                {this.state.isFormSubmitted && this.state.isRegistrationSuccess ? <SignIn /> :
                    <View>
                        {this.state.isFormSubmitted ? <Text style={styles.text}>The UserID alreday taken,Please try other</Text> : <Text></Text>}

                        <Form
                            ref="form"
                            onSubmit={this.handleSubmit} y
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
                                name="FirstName"
                                label="FirstName"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                placeholder="First Name"
                                type="text"
                                value={user.FirstName}
                                onChange={this.handleFirstName}
                            />
                            <TextValidator
                                name="LastName"
                                label="LastName"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                placeholder="Last Name"
                                type="text"
                                value={user.LastName}
                                onChange={this.handleLastName}
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
                            <TextValidator
                                name="repeatPassword"
                                label="text"
                                secureTextEntry
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['Password mismatch', 'This field is required']}
                                placeholder="Confirm Password"
                                type="text"
                                value={user.ConfirmPassword}
                                onChange={this.handleRepeatPassword}
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

