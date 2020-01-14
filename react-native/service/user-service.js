import axios from 'axios';
import WS from 'react-native-websocket'
import React from 'react'
import * as MessageService from '../service/message-service'
import NetInfo from "@react-native-community/netinfo";


export let connection = null;
let loggedInUserId = null;
let prevState = null;
const serverUrl = 'http://10.37.20.164:8000'
const websocketUrl = 'ws://10.37.20.164:8000'
export const registration = async (user) => {
  return await axios.post(serverUrl+'/registration', user);
}
export const signin = async (user) => {
  return await axios.post(serverUrl+'/signin', user);
}
export const getAllUsers = async (userId) => {
  return await axios.get(serverUrl+'/getAllUsers?id=' + userId)
}
export const geScocketConnection = async (userId, token ,onChangeHandler) => {
  loggedInUserId = userId
  console.log("in geScocketConnection ",loggedInUserId,connection);
  
  connection = createSocketConnection(userId,token);

  onNetworkStatusChange( (status) => {
    if(status && (connection == null || connection.readyState == 3)) {
      connection = createSocketConnection(userId);
      onChangeHandler(connection);
    }
  });

  return connection
  
}

export const createSocketConnection =  (userId,token) => {
  if ((connection == null || connection.readyState == 3) &&  loggedInUserId != null) {
    connection = new WebSocket(websocketUrl+"/ws?id=" + userId+"&token="+token);
    connection.onopen = (event) => {
      connection.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log("message from server user service ", data)
        MessageService.addMessagetoStore(data.senderId, data)

      }

    }
    connection.onclose = (event) => {
      console.log("on close event,connection state: ", connection.readyState)
    }
  } 

  return connection;
}

export const onNetworkStatusChange = (callback) => {
  NetInfo.addEventListener(state => {
    console.log("isConnected isInternetReachable : ",state.isConnected,state.isInternetReachable)
      state.isConnected && state.isInternetReachable ? callback(true) : callback(false);
   
    
  });
}


