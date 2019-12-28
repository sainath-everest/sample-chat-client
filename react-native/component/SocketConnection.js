import React, { Component } from 'react';
import WS from 'react-native-websocket'
import { View } from 'react-native'
export default class SocketConnection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: "sai"

        }
    }
    onConnetedToServer(socket) {
        this.props.setSocketConnection(socket)

    }

    render() {
        const wesocketUrl = "ws://192.168.0.111:8000/ws?id=" + this.state.loggedInUser
        return (
            <View>
                <WS
                    ref={ref => {
                        this.ws = ref;
                    }}
                    url={wesocketUrl}
                    onOpen={() => {
                        console.log('Open!')
                        this.onConnetedToServer(this.ws)
                        // const msg = { ID: "suresh", Data: this.state.currentMessage }
                        // this.ws.send(JSON.stringify(msg))
                        // console.log('msg was sent')

                    }}
                    onMessage={(e) => {
                        console.log("recieved ", e.data)
                        //this.props.onMessageReceived(e.data)
                        //MessageReducer
                    }
                    }
                    onError={console.log}
                    onClose={console.log}
                   // reconnect // Will try to reconnect onClose
                />
            </View>

        )
    }
}
