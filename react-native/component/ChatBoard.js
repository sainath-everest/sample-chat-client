
import React, { Component } from 'react'
import { AppRegistry, Text, View } from 'react-native'
import WS from 'react-native-websocket'
export default class ChatBoard extends Component {
    constructor(props){
        super(props);
    }
    render () {
      return (
        <View style={{flex: 1}}>
          <WS
            ref={ref => {this.ws = ref}}
            url="ws://192.168.0.111:8000/ws?id=sai"
            onOpen={() => {
              console.log('Open!')
              const msg = {ID:"suresh",Data:"msg from sai"}
              this.ws.send(JSON.stringify(msg))
              console.log('msg was sent')
            }}
            onMessage={(e) => {console.log("recieved ",e.data)}}
            onError={console.log}
            onClose={console.log}
            reconnect // Will try to reconnect onClose
          />
        </View>
        
      )
    }
  }