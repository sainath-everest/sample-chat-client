import * as DatabaseService from './database-service'

export const  getUserMessagesById = async (userId) => {
    const userMessages = await DatabaseService.getUserMessagesById(userId)
    console.log("getUserMessagesById ",userMessages)
    return userMessages

}
export const addMessagetoStore = async(userId,message) => {
    const isUserExist = await DatabaseService.isUserExist(userId)
    console.log(isUserExist)
    if(isUserExist){
       await DatabaseService.addNewMessageToUser(userId,message)

    }
    else{
        await DatabaseService.insertNewUserRecord(userId,message)

    }
   
}
