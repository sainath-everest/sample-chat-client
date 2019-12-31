import React, { Component } from 'react';
import { View , Text } from 'react-native'

export default class SignOut extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.socket.close()
        console.log("socket state",this.props.socket.readyState)
    }
    render() {
        return(
            <View><Text>You have logged out of apllication</Text></View>
        )
    }

}