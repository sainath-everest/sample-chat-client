import axios from 'axios';
import WS from 'react-native-websocket'
import React from 'react'
import * as MessageService from '../service/message-service'
import NetInfo from "@react-native-community/netinfo";


export let connection = null;
let loggedInUserId = null;
export const registration = async (user) => {
  return await axios.post('http://192.168.0.111:8000/registration', user);
}
export const signin = async (user) => {
  return await axios.post('http://192.168.0.111:8000/signin', user);
}
export const getAllUsers = async (userId) => {
  return await axios.get('http://192.168.0.111:8000/getAllUsers?id=' + userId)
}
export const geScocketConnection = async (userId) => {
  loggedInUserId = userId
  console.log("in geScocketConnection ",loggedInUserId,connection);
  if ((connection == null || connection.readyState == 3) &&  loggedInUserId != null) {
    connection = new WebSocket("ws://192.168.0.111:8000/ws?id=" + userId);
    connection.onopen = (event) => {
      connection.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log("message from server user service ", data)
        MessageService.addMessagetoStore(data.senderId, data)

      }
      return connection

    }
    connection.onclose = (event) => {
      console.log("on close event,connection state: ", connection.readyState)
    }
  }

  return connection



}
// Subscribe
export const getNetWorkStatus = () => {
  NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    state.isConnected ? geScocketConnection(loggedInUserId) :""
    
  });
}


