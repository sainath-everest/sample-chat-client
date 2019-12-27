import axios from 'axios';
import WS from 'react-native-websocket'
import React from 'react'

export const registration = async (user) => {
  return await axios.post('http://192.168.0.50:8000/registration', user);
}
export const signin = async (user) => {
  return await axios.post('http://192.168.0.50:8000/signin', user);
}
export const beginWebscocketConnection = (message) => {
  <WS
    ref={ref => { this.ws = ref }}
    url = "ws://192.168.0.111:8000/ws?id=sai"
    onOpen={() => {
      console.log('Open!')
      const msg = { ID: "suresh", Data: message }

        this.ws.send(JSON.stringify(msg))
        console.log('msg was sent')
      

    }}
    onMessage={(e) => {
      console.log("recieved ", e.data)
      this.onMessageReceived(e.data)
      //this.state.incomingMessages = this.state.incomingMessages.push(e.data)
    }
    }
    onError={console.log}
    onClose={console.log}
    reconnect // Will try to reconnect onClose
  />

}