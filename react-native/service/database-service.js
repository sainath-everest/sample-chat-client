const Realm = require('realm');
const UserSchema = {
  name: 'User',
  primaryKey: 'userId',
  properties: {
    userId: { type: 'string' },
    messages: 'Message[]'
  }
}
const Messageschema = {
  name: 'Message',
  properties: {
    senderId: { type: 'string' },
    receiverId: { type: 'string' },
    data: { type: 'string' },
    date: { type: 'string' },
    messageType: { type: 'string' }

  }
}
const UserLoginInfoschema = {
  name: 'UserLoginInfo',
  properties: {
    loggedinUserId: { type: 'string' },
    token: { type: 'string' }

  }

}


export const insertNewUserRecord = async (userId, message) => {
  console.log("in insertNewUserRecord")
  Realm.open({
    schema: [UserSchema, Messageschema,UserLoginInfoschema]
  }).then(realm => {
    realm.write(() => {
      let user = realm.create('User', { userId: userId, messages: [] });
      user.messages.push(message)
      console.log("after insertNewUserRecord ", user.userId)
    });
  });

}
export const isUserExist = async (userId) => {
  console.log("in isUserExist")
  let isUserExist = false;

  let realm = await Realm.open({
    schema: [UserSchema, Messageschema,UserLoginInfoschema]
  })

  let users = realm.objects('User')
  for (let user of users) {
    if (`${user.userId}` == userId) {
      isUserExist = true;
    }
  }
  return isUserExist

}
export const addNewMessageToUser = async (userId, message) => {
  console.log("in addNewMessageToUser")
  Realm.open({
    schema: [UserSchema, Messageschema,UserLoginInfoschema]
  }).then(realm => {
    realm.write(() => {
      let msg = realm.create('Message', message);
      let user = realm.create('User', { userId: userId }, true);
      user.messages.push(msg)
      console.log("after insertNewUserRecord ", message)
    });
  });

}
export const getUserMessagesById = async (userId) => {

  let realm = await Realm.open({
    schema: [UserSchema, Messageschema,UserLoginInfoschema]
  })
  let users = realm.objects('User').filtered(' userId == $0', userId)
  let userMessages = []
  console.log(users.length)
  if (users.length > 0) {
    for (let msg of users[0].messages) {
      userMessages.push(JSON.parse(JSON.stringify(msg)))

    }

  }
  console.log("userMessages ", userMessages)
  return userMessages

}
export const addUserLoginInfo = async (userId, token) => {
  console.log("in addUserLoginInfo")
  Realm.open({
    schema: [UserLoginInfoschema,UserSchema, Messageschema]
  }).then(realm => {
    realm.write(() => {
      let userLoginInfo = realm.create('UserLoginInfo', { loggedinUserId: userId, token: token });
      console.log("userLoginInfo ", userLoginInfo)

    })

  }

  )

}

export const getUserLoginfo = async (uerId) => {
  console.log("in getUserLoginfo")

  let realm = await Realm.open({
    schema: [UserSchema, Messageschema,UserLoginInfoschema]
  })
  let userLoginInfo = realm.objects('UserLoginInfo')
  let userInfo = null
  if(userLoginInfo.length>0){
    userInfo = {"userId":`${userLoginInfo[0].loggedinUserId}`,"token":`${userLoginInfo[0].token}`}
  }
  return userInfo

}