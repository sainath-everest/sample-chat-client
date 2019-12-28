import axios from 'axios';
import WS from 'react-native-websocket'
import React from 'react'
import GLOBAL from '../component/global'

let connection = null;
export const registration = async (user) => {
  return await axios.post('http://192.168.0.50:8000/registration', user);
}
export const signin = async (user) => {
  return await axios.post('http://192.168.0.50:8000/signin', user);
}
export const geScocketConnection = async () => {
  if(connection == null){
    connection = new WebSocket("ws://192.168.0.111:8000/ws?id=sai") ;
  }
  connection.onopen = (event) => {
    connection.onmessage = (event) => {
      console.log(event.data);
      GLOBAL.globalSatate.incomingMessages.push(event.data)

    }
  }
    return connection
  
}