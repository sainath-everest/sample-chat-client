let messageMap = {
    "suresh" : [
        {senderId:"sai",receiverId:"suresh",data:"hi",date:"Dec 28 2019 14:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"how are you",date:"Dec 28 2019 15:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"hi",date:"Dec 29 2019 13:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"how are you",date:"Dec 29 2019 14:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"hi",date:"Dec 29 2019 15:14:47"},

        {senderId:"sai",receiverId:"suresh",data:"hi",date:"Dec 28 2019 14:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"how are you",date:"Dec 28 2019 15:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"hi",date:"Dec 29 2019 13:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"how are you",date:"Dec 29 2019 14:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"hi",date:"Dec 29 2019 15:14:47"},

        {senderId:"sai",receiverId:"suresh",data:"hi",date:"Dec 28 2019 14:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"how are you",date:"Dec 28 2019 15:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"hi",date:"Dec 29 2019 13:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"how are you",date:"Dec 29 2019 14:14:47"},
        {senderId:"sai",receiverId:"suresh",data:"hi",date:"Dec 29 2019 15:14:47"},
    ],
    "srikanth" : [
        {senderId:"sai",receiverId:"srikanth",data:"hi"},
        {senderId:"sai",receiverId:"srikanth",data:"how are you"},
    ],
}
export const  getUserMessagesById = (userId) => {
    let userMessages = [];
    for(let id in messageMap) {
        if(userId === id )
            userMessages = messageMap[id]
    }
    return userMessages
}
export const addMessagetoStore = (userId,message) => {
    let userMessages
    if(messageMap[userId]==null ){
        messageMap[userId] = []
    }
    userMessages = messageMap[userId]
    userMessages.push(message)
   
    
    
}
