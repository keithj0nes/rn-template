import { AsyncStorage } from 'react-native';
export const setUser = user => ({type: 'AUTH_SET_USER', payload: user})

// export const fetchUserData = (data) => dispatch => {
//   return dispatch(setUser(data))
// }

const fakeDB = {
  user1: {
    isUser: true,
    name: 'Keith',
    email: 'K@jwt.com',
    password: 'Pass@@',
    token: '1234',
    onBoarding: true //this is for tips popup when user first clicks to add a new story
  },
  user2: {
    isUser: true,
    name: 'John',
    email: 'john.hicks@jwt.com',
    password: 'Yousuck@@',
    token: '12346',
    onBoarding: true //this is for tips popup when user first clicks to add a new story
  }
}


export const fetchUserDataLogin = (data) => dispatch => new Promise((resolve, reject) => {
//Make real database calls here
  console.log(data, 'data!!!');
  if((data.e === fakeDB.user1.email && data.p === fakeDB.user1.password) || (data.e === fakeDB.user2.email && data.p === fakeDB.user2.password)){
    // console.log('same');
    setTimeout(function () {
      if(data.ssi){
        AsyncStorage.setItem('userToken', '1234')
      }
      resolve(dispatch(setUser(fakeDB.user1)));
    }, 2000);
  } else {
    // console.log('not the same!');
    setTimeout(function () {
      resolve({payload:{isUser: false}})
    }, 2000);
  }
})



export const fetchUserDataToken = (token) => dispatch => new Promise((resolve, reject) => {
//Make real database calls here
  if(token === fakeDB.user1.token){
    setTimeout(function () {
      resolve(dispatch(setUser(fakeDB.user1)));
    }, 2000);
  } else {
    setTimeout(function () {
      resolve({payload:{isUser: false}})
    }, 2000);
  }
})

export const createUser = (data) => dispatch => new Promise((resolve, reject) => {

})


export const logOut = user => dispatch => new Promise((resolve, reject) => {
  console.log(user, 'user in actioncreator ');

  setTimeout(function () {
    AsyncStorage.removeItem('userToken').then(res => {
      resolve(dispatch(setUser(null)))
    })
  }, 1000);
})
