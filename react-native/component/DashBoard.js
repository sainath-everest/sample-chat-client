import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native'
import {getNetWorkStatus} from '../service/user-service'


export default class DashBoard extends Component {
    componentDidMount(){
        getNetWorkStatus()
    }
   
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style = {styles.title}>CHAT APP</Text>
                <View style={styles.button}>
                    <Button
                        title="SignUp"
                        color="#A2D9CE"
                        onPress={() => navigate('SignuUp')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="SignIn"
                        color="#A2D9CE"
                        onPress={() => navigate('SignIn')}
                    />
                </View>


            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    button: {
        padding: 10,
        margin: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    }
})