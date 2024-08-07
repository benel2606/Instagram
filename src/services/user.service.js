import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { httpService } from './old/http.service'

export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
    getByUsername,
    getSuggestions,
    isFollow
}
const STORAGE_KEY_USER = 'user'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedInuser'
window.userService = userService
_createUsers()

async function getUsers() {
    var users = await storageService.query(STORAGE_KEY_USER)
    // return httpService.get(`user`)
    return users
}

function getById(userId) {
    return storageService.get(STORAGE_KEY_USER, userId)
}

async function getByUsername(username) {
    var users = await storageService.query(STORAGE_KEY_USER)
    const user=users.find((user)=>user.username==username)
    return user
}

// async function getById(userId) {
//     const user = await storageService.get('user', userId)
//     // const user = await httpService.get(`user/${userId}`)
//     return user
// }

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})

    // When admin updates other user's details, do not update loggedinUser
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) return saveLocalUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.score = 10000
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}

async function saveLocalUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname,username:user.username, imgUrl: user.imgUrl, following: user.following, followers : user.followers,savedStoryIds:user.savedStoryIds,bio:user.bio }
    //sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    const savedUser = await storageService.put(STORAGE_KEY_USER, userToSave)
    return savedUser
}

// function getLoggedinUser() {
//     return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
// }


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

function getLoggedinUser(){
    return {
      _id: "u10",
      fullname: "Benel Aharon",
      username: "ben_aharon",
      imgUrl: "img/profile/p10/p10.jpg",
      //bio: "love coding with React",
      //following: ['u101', 'u102', 'u103'],
      //followers: ['u101'],
      //savedStoryIds: [],
    }
    // const loggedInUser={
    //       _id: "u10",
    //       fullname: "Benel Aharon",
    //       username: "ben_aharon",
    //       imgUrl: "img/profile/p10/p10.jpg",
    //       bio: "love coding with React",
    //       following: ['u101', 'u102', 'u103'],
    //       followers: ['u101'],
    //       savedStoryIds: [],
    //     }
    // utilService.saveToStorage(STORAGE_KEY_LOGGEDIN_USER, loggedInUser)
    //return loggedInUser
  }
  function _createUsers(){
  let users = utilService.loadFromStorage(STORAGE_KEY_USER)
    if (!users || !users.length) {
        users=
        [{
            _id: "u10",
            fullname: "Benel Aharon",
            username: "ben_aharon",
            imgUrl: "img/profile/p10/p10.jpg",
            bio: "Love coding with React",
            following: ['u101', 'u106'],
            followers: ['u101'],
            savedStoryIds: [],
        },
        {
            _id: "u101",
            fullname: "Maurizio Ghiraldi",
            username: "Maurizio.Ghir1",
            imgUrl: "img/profile/p1/p1.jpg",
            bio: "Love is in the air",
            following: ['u10', 'u102', 'u103'],
            followers: ['u102'],
            savedStoryIds: [],
        },
        {
            _id: "u102",
            fullname: "Lorry Tenby",
            username: "Lorryyyy",
            imgUrl: "img/profile/p2/p2.jpg",
            bio: "Keep taveling",
            following: ['u10', 'u104', 'u105'],
            followers: ['u102'],
            savedStoryIds: [],
        },
        {
            _id: "u104",
            fullname: "Cort Guion",
            username: "Cort258",
            imgUrl: "img/profile/p4/p4.jpg",
            bio: "Family forever",
            following: ['u101', 'u102', 'u105'],
            followers: ['u102','u105'],
            savedStoryIds: [],
        },
        {
            _id: "u105",
            fullname: "Kingsly Traylen",
            username: "Kingsly123",
            imgUrl:  "img/profile/p5/p5.jpg",
            bio: "",
            following: ['u101', 'u102', 'u106'],
            followers: ['u102','u105'],
            savedStoryIds: [],
        },
        {
            _id: "u106",
            fullname: "Sabina Duxbury",
            username: "Sabina_Dux28",
            imgUrl: "img/profile/p6/p6.jpg",
            bio: "Your personal trainer",
            following: ['u10', 'u102', 'u103'],
            followers: ['u102','u103'],
            savedStoryIds: [],
        },
        {
            _id: "u108",
            fullname: "Maria lavine",
            username: "maria78",
            imgUrl: "img/profile/p8/p8.jpg",
            bio: "Be kind. work hard",
            following: ['u10', 'u102', 'u103'],
            followers: ['u102','u103'],
            savedStoryIds: [],
          },
          {
            _id: "u107",
            fullname: "Elan Shewring",
            username: "Elanaaa",
            imgUrl: "img/profile/p7/p7.jpg",
            bio: "Be the hero of own story",
            following: ['u10', 'u102', 'u103','u104'],
            followers: ['u102','u103','u104'],
            savedStoryIds: [],
          },
          {
            _id: "u103",
            fullname: "Dirk Earles",
            username: "Dir8787",
            imgUrl: "img/profile/p3/p3.jpg",
            bio: "Pizza addict!",
            following: ['u10', 'u102', 'u103'],
            followers: ['u102','u105'],
            savedStoryIds: [],
          }
    ]}
    utilService.saveToStorage(STORAGE_KEY_USER, users)
  }

  function xgetSuggestions(){
    const suggestions=
    [{
        _id: "u108",
        fullname: "Maria lavine",
        username: "maria78",
        imgUrl: "img/profile/p8/p8.jpg",
        bio: "Be kind. work hard",
        following: ['u10', 'u102', 'u103'],
        followers: ['u102','u103'],
        savedStoryIds: [],
      },
      {
        _id: "u107",
        fullname: "Elan Shewring",
        username: "Elanaaa",
        imgUrl: "img/profile/p7/p7.jpg",
        bio: "Be the hero of own story",
        following: ['u10', 'u102', 'u103','u104'],
        followers: ['u102','u103','u104'],
        savedStoryIds: [],
      },
      {
        _id: "u103",
        fullname: "Dirk Earles",
        username: "Dir8787",
        imgUrl: "img/profile/p3/p3.jpg",
        bio: "Pizza addict!",
        following: ['u10', 'u102', 'u103'],
        followers: ['u102','u105'],
        savedStoryIds: [],
      },]
    
    return suggestions
  }
  async function getSuggestions(){
    let suggestionArr=[]
    //const getFullUser=async (userId)=>await getById(userId)
    const suggetionsUsersId=["u103","u107","u108"]
    suggetionsUsersId.map(async (suggetionsId)=>{
        suggestionArr.push(await getById(suggetionsId))
    })
    console.log(suggestionArr)
    return suggestionArr
  }
  
  function isFollow(user) {
    const loggedInUser=getLoggedinUser()
    return user.followers.includes(loggedInUser._id)
   
  }