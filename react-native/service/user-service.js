import axios from 'axios';
import WS from 'react-native-websocket'
import React from 'react'

let connection = null;
export const registration = async (user) => {
  return await axios.post('http://192.168.0.13:8000/registration', user);
}
export const signin = async (user) => {
  return await axios.post('http://192.168.0.13:8000/signin', user);
}
export const geScocketConnection = async (userId) => {
  if(connection == null){
    connection = new WebSocket("ws://192.168.0.13:8000/ws?id="+userId) ;
    connection.onopen = (event) => {
      return connection
 
    }
  
  }
  return connection
  
    
  
}