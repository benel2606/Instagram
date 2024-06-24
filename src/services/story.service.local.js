
import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { userService } from './user.service'

const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory,
    addStoryMsg
}
window.cs = storyService
_createStories()

async function query(filterBy = {}) {
    var stories = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     stories = stories.filter(story => regex.test(story.vendor) || regex.test(story.description))
    // }
    // if (filterBy.price) {
    //     stories = stories.filter(story => story.price <= filterBy.price)
    // }
    // Return just preview info about the boards
    // stories = stories.map(({ _id, vendor, price, owner }) => ({ _id, vendor, price, owner }))
    return stories
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    var savedStory
    if (story._id) {
        const storyToSave = {
            _id : story._id,
            price : story.price
        }
        savedStory = await storageService.put(STORAGE_KEY, storyToSave)
    } else {
        // Later, owner is set by the backend
        const storyToSave = {
            vendor : story.vendor,
            price : story.price,
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedStory = await storageService.post(STORAGE_KEY, storyToSave)
    }
    return savedStory
}

async function addStoryMsg(storyId, txt) {
    // Later, this is all done by the backend
    const story = await getById(storyId)

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    story.msgs.push(msg)
    await storageService.put(STORAGE_KEY, story)

    return msg
}

function getEmptyStory() {
    return {
        vendor: 'Susita-' + utilService.makeId(),
        price: utilService.getRandomIntInclusive(1000, 9000),
        msgs: []
    }
}

function _createStories() {
    let stories = utilService.loadFromStorage(STORAGE_KEY)
    if (!stories || !stories.length) {
        stories=
        [{
            _id: "s101",
            txt: "Best trip ever",
            imgUrl: "/profile/p1/story/s1.jpg", 
            by: {
              _id: "u101",
              fullname: "Maurizio Ghiraldi",
              username: "Maurizio.Ghir1",
              imgUrl: "/profile/p1/p1.jpg"
            },
            comments: [
              {
                id: "c101",
                by: {
                  _id: "u105",
                  fullname: "Kingsly Traylen",
                  username: "Kingsly123",
                  imgUrl: "/profile/p5.jpg"
                },
                txt: "good one!",
              },
              {
                id: "c1002",
                by: {
                  _id: "u106",
                  fullname: "Sabina Duxbury",
                  username: "Sabina_Dux28",
                  imgUrl: "/profile/p5.jpg"
                },
                txt: "Wow!",
              }
            ],
            likedBy: [
              {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl: "/profile/p5.jpg"
              },
              {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl: "/profile/p5.jpg"
              }
            ],
            tags: ["fun", "romantic"]
          }]
        }
        utilService.saveToStorage(STORAGE_KEY, stories)
    }



