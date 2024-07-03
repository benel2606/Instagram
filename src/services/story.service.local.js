
import { storageService } from './async-storage.service'
import { utilService } from './util.service'
// import { userService } from './user.service'

const STORAGE_KEY = 'story'
const SUGGESTION_KEY = 'suggestion'

export const storyService = {
  getLoggedinUser,  
  query,
  getById,
  save,
  remove,
  getEmptyStory,
  addStoryMsg,
  formatTime,
  createComment,
  getSuggestions,
  getExplore
}
window.cs = storyService
_createStories()

function getLoggedinUser(){
  return {
    _id: "u10",
    fullname: "benel Aharon",
    username: "ben_aharon",
    imgUrl: "/profile/p10/p10.jpg",
  }
}

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
            txt : story.txt,
            imgUrl: story.imgUrl, 
            by: story.by,
            comments: story.comments,
            likedBy: story.likedBy,
            tags: story.tags
        }
        savedStory = await storageService.put(STORAGE_KEY, storyToSave)
    } else {
        // Later, owner is set by the backend
        const storyToSave = {
            vendor : story.vendor,
            price : story.price,
            // owner: userService.getLoggedinUser(),
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
        // by: userService.getLoggedinUser(),
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
            timestamp:1719392425000,
            imgUrl: "/profile/p1/story/s3.jpg", 
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
                  imgUrl: "/profile/p5/p5.jpg"
                },
                txt: "good one!",
              },
              {
                id: "c1002",
                by: {
                  _id: "u106",
                  fullname: "Sabina Duxbury",
                  username: "Sabina_Dux28",
                  imgUrl:  "/profile/p6/p6.jpg"
                },
                txt: "Wow!",
              }
            ],
            likedBy: [
              {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl:  "/profile/p5/p5.jpg"
              },
              {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl:  "/profile/p6/p6.jpg"
              }
            ],
            tags: ["fun", "romantic"]
          },
          {
            _id: "s102",
            txt: "sport for life!",
            timestamp:1687183225000,
            imgUrl: "/profile/p6/story/s1.jpg", 
            by: {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "/profile/p6/p6.jpg"
            },
            comments: [
              {
                id: "c101",
                by: {
                  _id: "u105",
                  fullname: "Kingsly Traylen",
                  username: "Kingsly123",
                  imgUrl:  "/profile/p5/p5.jpg"
                },
                txt: "good one!",
              },
              {
                id: "c1002",
                by: {
                  _id: "u106",
                  fullname: "Maurizio Ghiraldi",
                  username: "Maurizio.Ghir1",
                  imgUrl:  "/profile/p6/p6.jpg"
                },
                txt: "Wow!",
              }
            ],
            likedBy: [
              {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl:  "/profile/p5/p5.jpg"
              },
              {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl:  "/profile/p6/p6.jpg"
              }
            ],
            tags: ["sport", "romantic"]
          },
          {
            _id: "s103",
            txt: "Best trip ever",
            timestamp:1681924525000,
            imgUrl: "/profile/p2/story/s2.jpg", 
            by: {
              _id: "u102",
              fullname: "Lorry Tenby",
              username: "Lorryyyy",
              imgUrl: "/profile/p2/p2.jpg"
            },
            comments: [
              {
                id: "c101",
                by: {
                  _id: "u105",
                  fullname: "Kingsly Traylen",
                  username: "Kingsly123",
                  imgUrl:  "/profile/p5/p5.jpg"
                },
                txt: "good one!",
              },
              {
                id: "c1002",
                by: {
                  _id: "u106",
                  fullname: "Sabina Duxbury",
                  username: "Sabina_Dux28",
                  imgUrl:  "/profile/p6/p6.jpg"
                },
                txt: "Wow!",
              }
            ],
            likedBy: [
              {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl:  "/profile/p5/p5.jpg"
              },
              {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl:  "/profile/p6/p6.jpg"
              }
            ],
            tags: ["fun", "romantic"]
          }
        ,{
          _id: "s104",
          txt: "Love",
          timestamp:1679238025000,
          imgUrl: "/profile/p4/story/s1.jpg", 
          by: {
            _id: "u104",
            fullname: "Cort Guion",
            username: "Cort258",
            imgUrl: "/profile/p4/p4.jpg"
          },
          comments: [
            {
              id: "c101",
              by: {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl:  "/profile/p5/p5.jpg"
              },
              txt: "good one!",
            },
            {
              id: "c1002",
              by: {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl:  "/profile/p6/p6.jpg"
              },
              txt: "Wow!",
            }
          ],
          likedBy: [
            {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "/profile/p5/p5.jpg"
            },
            {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl:  "/profile/p6/p6.jpg"
            }
          ],
          tags: ["fun", "romantic"]
        }]
        }
        utilService.saveToStorage(STORAGE_KEY, stories)
    }

function formatTime(timestamp) {
      const currentTime = new Date();
      const postTime = new Date(timestamp); // Convert timestamp to milliseconds
  
      const timeDifference = Math.floor((currentTime - postTime) / 1000); // Difference in seconds
  
      if (timeDifference < 60) {
          return `${timeDifference} seconds ago`;
      } else if (timeDifference < 3600) {
          const minutes = Math.floor(timeDifference / 60);
          return `${minutes} minutes ago`;
      } else if (postTime.getDate() === currentTime.getDate()) {
          return postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (postTime.getDate() === currentTime.getDate() - 1) {
          return 'Yesterday';
      } else {
          const options = { month: 'short', day: 'numeric' };
          return postTime.toLocaleDateString('en-US' , options);
      }
  }

function createComment(txt) {
    return {
      id: utilService.makeId(),
      by: getLoggedinUser(),
      txt
    }
  }

function getSuggestions(){
  const suggestions=
  [{
    _id: "u120",
    fullname: "Marline McLane",
    username: "Marline112",
    imgUrl: "/suggestion/p20.jpg"
  },
  {
    _id: "u121",
    fullname: "Elana Shewring",
    username: "Elanaaa",
    imgUrl: "/suggestion/p21.jpg"
  },
  {
    _id: "u122",
    fullname: "Dirk Earles",
    username: "Dir8787",
    imgUrl: "/suggestion/p22.jpg"
  },]
  return suggestions
}
function getExplore(){
  const explore=
  [{
    _id: "p131",
    imgUrl: "/explore/e1.jpg"
  },
  {
    _id: "p132",
    imgUrl: "/explore/e2.jpg"
  },
  {
    _id: "p133",
    imgUrl: "/explore/e3.jpg"
  },
  {
    _id: "p134",
    imgUrl: "/explore/e4.jpg"
  },
  {
    _id: "p135",
    imgUrl: "/explore/e5.jpg"
  },
  {
    _id: "p136",
    imgUrl: "/explore/e6.jpg"
  },
  {
    _id: "p137",
    imgUrl: "/explore/e7.jpg"
  },
  {
    _id: "p138",
    imgUrl: "/explore/e8.jpg"
  },
  {
    _id: "p139",
    imgUrl: "/explore/e9.jpg"
  },
  {
    _id: "p140",
    imgUrl: "/explore/e10.jpg"
  },
  {
    _id: "p141",
    imgUrl: "/explore/e11.jpg"
  },
  {
    _id: "p142",
    imgUrl: "/explore/e12.jpg"
  },
  ]
  return explore
}