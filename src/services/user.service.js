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
    getByUsername
}
const STORAGE_KEY_USER = 'user'
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


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score, isAdmin : user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
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
      bio: "love coding with React",
      following: ['u101', 'u102', 'u103'],
      followers: ['u101'],
      savedStoryIds: [],
    }
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
            bio: "love coding with React",
            following: ['u101', 'u106', 'u103'],
            followers: ['u101'],
            savedStoryIds: [],
        },
        {
            _id: "u101",
            fullname: "Maurizio Ghiraldi",
            username: "Maurizio.Ghir1",
            imgUrl: "img/profile/p1/p1.jpg",
            bio: "love is in the air",
            following: ['u10', 'u102', 'u103'],
            followers: ['u102'],
            savedStoryIds: [],
        },
        {
            _id: "u102",
            fullname: "Lorry Tenby",
            username: "Lorryyyy",
            imgUrl: "img/profile/p2/p2.jpg",
            bio: "",
            following: ['u10', 'u104', 'u105'],
            followers: ['u102'],
            savedStoryIds: [],
        },
        {
            _id: "u104",
            fullname: "Cort Guion",
            username: "Cort258",
            imgUrl: "img/profile/p4/p4.jpg",
            bio: "",
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
    ]}
    utilService.saveToStorage(STORAGE_KEY_USER, users)
  }