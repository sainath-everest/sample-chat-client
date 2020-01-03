import axios from 'axios';
import WS from 'react-native-websocket'
import React from 'react'
import * as MessageService from '../service/message-service'

let connection = null;
export const registration = async (user) => {
  return await axios.post('http://192.168.0.65:8000/registration', user);
}
export const signin = async (user) => {
  return await axios.post('http://192.168.0.65:8000/signin', user);
}
export const getAllUsers = async (userId) => {
  return await axios.get('http://192.168.0.65:8000/getAllUsers?id='+userId)
}
export const geScocketConnection = async (userId) => {
  if(connection == null){
    connection = new WebSocket("ws://192.168.0.65:8000/ws?id="+userId) ;
    connection.onopen = (event) => {
      connection.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log("message from server user service ", data)
        MessageService.addMessagetoStore(data.senderId,data)
  
      }

      return connection
 
    }

  }
  
  return connection
  
    
  
}