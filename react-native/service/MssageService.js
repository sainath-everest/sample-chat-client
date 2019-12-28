let messageMap = {}
export const  getUserMessagesById = (userId) => {
    const userMessages = [];
    for(let id in messageMap) {
        if(userId === id )
            userMessages.push(userMessages[id]);
    }
    return userMessages
}
export const addMessagetoStore = (userId,message) => {
    let userMessages
    if(messageMap[userId]==null ){
        messageMap[userId] = []
    }
    userMessages = this.messageMap[userId]
    userMessages.push(message)
   
    
    
}
