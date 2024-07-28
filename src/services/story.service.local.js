
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
    fullname: "Benel Aharon",
    username: "ben_aharon",
    imgUrl: "img/profile/p10/p10.jpg",
    //bio: "love coding with React",
    //following: ['u101', 'u102', 'u103'],
    //followers: ['u101'],
    //savedStoryIds: [],
  }
}

async function query(filterBy = {}) {
    var stories = await storageService.query(STORAGE_KEY)
    stories=stories.sort((a,b)=>b.timestamp-a.timestamp)
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
            tags: story.tags,
            timestamp:story.timestamp
        }
        savedStory = await storageService.put(STORAGE_KEY, storyToSave)
    } else {
        // Later, owner is set by the backend
        const storyToSave = {
          txt : story.txt,
          imgUrl: story.imgUrl, 
          by: story.by,
          comments: story.comments,
          likedBy: story.likedBy,
          tags: story.tags,
          timestamp:story.timestamp
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
    const loggedinUser=getLoggedinUser()
    const byUser={_id:loggedinUser._id,username:loggedinUser.username,fullname:loggedinUser.fullname,imgUrl:loggedinUser.imgUrl}
    return {
      //_id : utilService.makeId(),
      txt :"",
      imgUrl: "", 
      by: byUser,
      comments: [],
      likedBy: [],
      tags: [],
      timestamp:""
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
            imgUrl: "img/profile/p1/story/s2.jpg", 
            by: {
              _id: "u101",
              fullname: "Maurizio Ghiraldi",
              username: "Maurizio.Ghir1",
              imgUrl: "img/profile/p1/p1.jpg"
            },
            comments: [
              {
                id: "c101",
                by: {
                  _id: "u105",
                  fullname: "Kingsly Traylen",
                  username: "Kingsly123",
                  imgUrl: "img/profile/p5/p5.jpg"
                },
                txt: "good one!",
              },
              {
                id: "c1002",
                by: {
                  _id: "u106",
                  fullname: "Sabina Duxbury",
                  username: "Sabina_Dux28",
                  imgUrl: "img/profile/p6/p6.jpg"
                },
                txt: "Wow!",
              }
            ],
            likedBy: [
              {
              _id: "u105",
                  fullname: "Kingsly Traylen",
                  username: "Kingsly123",
                  imgUrl: "img/profile/p5/p5.jpg"
              },
              {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl: "img/profile/p5/p5.jpg"
              },
            ],
            tags: ["fun", "romantic"]
          },
          {
            _id: "s102",
            txt: "sport for life!",
            timestamp:1687183225000,
            imgUrl: "img/profile/p6/story/s1.jpg", 
            by: {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg"
            },
            comments: [
              {
                id: "c101",
                by: {
                  _id: "u105",
                  fullname: "Kingsly Traylen",
                  username: "Kingsly123",
                  imgUrl: "img/profile/p5/p5.jpg"
                },
                txt: "good one!",
              },
              {
                id: "c1002",
                by: {
                  _id: "u106",
                  fullname: "Maurizio Ghiraldi",
                  username: "Maurizio.Ghir1",
                  imgUrl: "img/profile/p6/p6.jpg"
                },
                txt: "Looks great!",
              }
            ],
            likedBy: [
              {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl: "img/profile/p5/p5.jpg"
              }
            ],
            tags: ["sport", "romantic"]
          },
          {
            _id: "s103",
            txt: "Best trip ever",
            timestamp:1709299430000,
            imgUrl: "img/profile/p2/story/s2.jpg", 
            by: {
              _id: "u102",
              fullname: "Lorry Tenby",
              username: "Lorryyyy",
              imgUrl: "img/profile/p2/p2.jpg"
            },
            comments: [
              {
                id: "c101",
                by: {
                  _id: "u105",
                  fullname: "Kingsly Traylen",
                  username: "Kingsly123",
                  imgUrl: "img/profile/p5/p5.jpg"
                },
                txt: "good one!",
              },
              {
                id: "c1002",
                by: {
                  _id: "u106",
                  fullname: "Sabina Duxbury",
                  username: "Sabina_Dux28",
                  imgUrl: "img/profile/p6/p6.jpg"
                },
                txt: "Love you!",
              }
            ],
            likedBy: [
              {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl: "img/profile/p5/p5.jpg"
              },
              {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl: "img/profile/p6/p6.jpg"
              }
            ],
            tags: ["fun", "romantic"]
          },
        {
          _id: "s104",
          txt: "Love",
          timestamp:1712406230000,
          imgUrl: "img/profile/p4/story/s1.jpg", 
          by: {
            _id: "u104",
            fullname: "Cort Guion",
            username: "Cort258",
            imgUrl: "img/profile/p4/p4.jpg"
          },
          comments: [
            {
              id: "c101",
              by: {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl: "img/profile/p5/p5.jpg"
              },
              txt: "wow",
            },
            {
              id: "c1002",
              by: {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl: "img/profile/p6/p6.jpg"
              },
              txt: "good one!",
            }
          ],
          likedBy: [
            {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg"
            },
            {
              _id: "u102",
              fullname: "Lorry Tenby",
              username: "Lorryyyy",
              imgUrl: "img/profile/p2/p2.jpg"
            }
          ],
          tags: ["fun", "romantic"]
        },
        {
          _id: "s105",
          txt: "good vibes!",
          timestamp:1705755650000,
          imgUrl: "img/profile/p10/story/s1.jpg", 
          by: {
            _id: "u10",
            fullname: "benel Aharon",
            username: "ben_aharon",
            imgUrl: "img/profile/p10/p10.jpg"
          },
          comments: [
            {
              id: "c101",
              by: {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl: "img/profile/p5/p5.jpg"
              },
              txt: "good one!",
            },
            {
              id: "c1002",
              by: {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl: "img/profile/p6/p6.jpg"
              },
              txt: "Wow!",
            }
          ],
          likedBy: [
            {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg"
            },
            {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg"
            }
          ],
          tags: ["fun", "romantic"]
        },
        {
          _id: "s106",
          txt: "Best trip!",
          timestamp:1708434050000,
          imgUrl: "img/profile/p10/story/s2.jpg", 
          by: {
            _id: "u10",
            fullname: "benel Aharon",
            username: "ben_aharon",
            imgUrl: "img/profile/p10/p10.jpg"
          },
          comments: [
            {
              id: "c101",
              by: {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl: "img/profile/p5/p5.jpg"
              },
              txt: "Amazing!",
            },
            {
              id: "c1002",
              by: {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl: "img/profile/p6/p6.jpg"
              },
              txt: "Enjoy",
            }
          ],
          likedBy: [
            {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg"
            },
            {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg"
            }
          ],
          tags: ["view", "travel"]
        },
        {
          _id: "s107",
          txt: "Cook and love",
          timestamp:1718884850000,
          imgUrl: "img/profile/p10/story/s3.jpg", 
          by: {
            _id: "u10",
            fullname: "benel Aharon",
            username: "ben_aharon",
            imgUrl: "img/profile/p10/p10.jpg"
          },
          comments: [
            {
              id: "c101",
              by: {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl: "img/profile/p5/p5.jpg"
              },
              txt: "looks great!",
            },
            {
              id: "c1002",
              by: {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl: "img/profile/p6/p6.jpg"
              },
              txt: "wow",
            }
          ],
          likedBy: [
            {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg"
            },
            {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg"
            }
          ],
          tags: ["cook"]
        },
        {
          _id: "s108",
          txt: "vaction",
          timestamp:1705323650000,
          imgUrl: "img/profile/p10/story/s4.jpg", 
          by: {
            _id: "u10",
            fullname: "benel Aharon",
            username: "ben_aharon",
            imgUrl: "img/profile/p10/p10.jpg"
          },
          comments: [
            {
              id: "c101",
              by: {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl: "img/profile/p5/p5.jpg"
              },
              txt: "Amazing!",
            },
            {
              id: "c1002",
              by: {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl: "img/profile/p6/p6.jpg"
              },
              txt: "nice shots",
            }
          ],
          likedBy: [
            {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg"
            },
            {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg"
            }
          ],
          tags: ["view", "travel"]
        },
        {
          _id: "s131",
          txt: "In Love!",
          timestamp:1718452850000,
          imgUrl: "img/profile/p4/story/s2.jpg", 
          by: {
            _id: "u104",
            fullname: "Cort Guion",
            username: "Cort258",
            imgUrl: "img/profile/p4/p4.jpg"
          },
          comments: [
            {
              id: "c101",
              by: {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl: "img/profile/p5/p5.jpg"
              },
              txt: "good one!",
            },
            {
              id: "c1002",
              by: {
                _id: "u106",
                fullname: "Maurizio Ghiraldi",
                username: "Maurizio.Ghir1",
                imgUrl: "img/profile/p6/p6.jpg"
              },
              txt: "Looks great!",
            }
          ],
          likedBy: [
            {
              _id: "u105",
              fullname: "Kingsly Traylen",
              username: "Kingsly123",
              imgUrl: "img/profile/p5/p5.jpg"
            }
          ],
          tags: ["romantic"]
        },
        {
          _id: "s132",
          txt: "Italy",
          timestamp:1705636850000,
          imgUrl: "img/profile/p7/story/s2.jpg", 
          by: {
            _id: "u107",
            fullname: "Elan Shewring",
            username: "Elanaaa",
            imgUrl: "img/profile/p7/p7.jpg"
          },
          comments: [
            {
              id: "c101",
              by: {
                _id: "u105",
                fullname: "Kingsly Traylen",
                username: "Kingsly123",
                imgUrl: "img/profile/p5/p5.jpg"
              },
              txt: "good one!",
            },
            {
              id: "c1002",
              by: {
                _id: "u106",
                fullname: "Maurizio Ghiraldi",
                username: "Maurizio.Ghir1",
                imgUrl: "img/profile/p6/p6.jpg"
              },
              txt: "Looks great!",
            }
          ],
          likedBy: [
            {
              _id: "u106",
                fullname: "Maurizio Ghiraldi",
                username: "Maurizio.Ghir1",
                imgUrl: "img/profile/p6/p6.jpg"
            }
          ],
          tags: ["vaction"]
        },
        {
          _id: "s133",
          txt: "H13",
          timestamp:1711339250000,
          imgUrl: "img/profile/p8/story/s2.jpg", 
          by: {
            _id: "u108",
            fullname: "Maria lavine",
            username: "maria78",
            imgUrl: "img/profile/p8/p8.jpg"
          },
          comments: [
            {
              id: "c101",
              by: {
                _id: "u106",
                fullname: "Sabina Duxbury",
                username: "Sabina_Dux28",
                imgUrl: "img/profile/p6/p6.jpg"
              },
              txt: "Cool!",
            },
            {
              id: "c1002",
              by: {
                _id: "u106",
                fullname: "Maurizio Ghiraldi",
                username: "Maurizio.Ghir1",
                imgUrl: "img/profile/p6/p6.jpg"
              },
              txt: "Nice",
            }
          ],
          likedBy: [
            {
              _id: "u106",
              fullname: "Maurizio Ghiraldi",
              username: "Maurizio.Ghir1",
              imgUrl: "img/profile/p6/p6.jpg"
            },
            {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg"
            }
          ],
          tags: []
        },
        {
          _id: "s134",
          txt: "Bridge",
          timestamp:1716606050000,
          imgUrl: "img/profile/p3/story/s3.jpg", 
          by: {
            _id: "u103",
            fullname: "Dirk Earles",
            username: "Dir8787",
            imgUrl: "img/profile/p3/p3.jpg"
          
          },
          comments: [
            {
              id: "c101",
              by: {
                _id: "u108",
                fullname: "Maria lavine",
                username: "maria78",
                imgUrl: "img/profile/p8/p8.jpg"
              },
              txt: "LOL!",
            },
            {
              id: "c1002",
              by: {
                _id: "u106",
                fullname: "Maurizio Ghiraldi",
                username: "Maurizio.Ghir1",
                imgUrl: "img/profile/p6/p6.jpg"
              },
              txt: "amazing",
            }
          ],
          likedBy: [
            {
              _id: "u106",
              fullname: "Maurizio Ghiraldi",
              username: "Maurizio.Ghir1",
              imgUrl: "img/profile/p6/p6.jpg"
            },
            {
              _id: "u106",
              fullname: "Sabina Duxbury",
              username: "Sabina_Dux28",
              imgUrl: "img/profile/p6/p6.jpg"
            }
          ],
          tags: []
        },
      ]
        }
        utilService.saveToStorage(STORAGE_KEY, stories)
    }

function xformatTime(timestamp) {
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
  function formatTime(timestamp) {
    const now = Date.now();
    const difference = now - timestamp;
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 7) {
        return `${days} days ago`;
    } else {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
    _id: "u108",
    fullname: "Maria lavine",
    username: "maria78",
    imgUrl: "img/profile/p8/p8.jpg"
  },
  {
    _id: "u107",
    fullname: "Elan Shewring",
    username: "Elanaaa",
    imgUrl: "img/profile/p7/p7.jpg"
  },
  {
    _id: "u103",
    fullname: "Dirk Earles",
    username: "Dir8787",
    imgUrl: "img/profile/p3/p3.jpg"
  },]
  return suggestions
}
function getExplore(){
  const explore=
  [{
    _id: "s131",
    txt: "In Love!",
    timestamp:1687183225000,
    imgUrl: "img/profile/p4/story/s2.jpg", 
    by: {
      _id: "u104",
      fullname: "Cort Guion",
      username: "Cort258",
      imgUrl: "img/profile/p4/p4.jpg"
    },
    comments: [
      {
        id: "c101",
        by: {
          _id: "u105",
          fullname: "Kingsly Traylen",
          username: "Kingsly123",
          imgUrl: "img/profile/p5/p5.jpg"
        },
        txt: "good one!",
      },
      {
        id: "c1002",
        by: {
          _id: "u106",
          fullname: "Maurizio Ghiraldi",
          username: "Maurizio.Ghir1",
          imgUrl: "img/profile/p6/p6.jpg"
        },
        txt: "Looks great!",
      }
    ],
    likedBy: [
      {
        _id: "u105",
        fullname: "Kingsly Traylen",
        username: "Kingsly123",
        imgUrl: "img/profile/p5/p5.jpg"
      }
    ],
    tags: ["romantic"]
  },
  {
    _id: "s132",
    txt: "Italy",
    timestamp:1687183225000,
    imgUrl: "img/profile/p5/story/s2.jpg", 
    by: {
      _id: "u105",
      fullname: "Kingsly Traylen",
      username: "Kingsly123",
      imgUrl: "img/profile/p5/p5.jpg"
    },
    comments: [
      {
        id: "c101",
        by: {
          _id: "u105",
          fullname: "Kingsly Traylen",
          username: "Kingsly123",
          imgUrl: "img/profile/p5/p5.jpg"
        },
        txt: "good one!",
      },
      {
        id: "c1002",
        by: {
          _id: "u106",
          fullname: "Maurizio Ghiraldi",
          username: "Maurizio.Ghir1",
          imgUrl: "img/profile/p6/p6.jpg"
        },
        txt: "Looks great!",
      }
    ],
    likedBy: [
      {
        _id: "u106",
          fullname: "Maurizio Ghiraldi",
          username: "Maurizio.Ghir1",
          imgUrl: "img/profile/p6/p6.jpg"
      }
    ],
    tags: ["vaction"]
  },
  {
    _id: "s133",
    txt: "H13",
    timestamp:1687183225000,
    imgUrl: "img/profile/p8/story/s2.jpg", 
    by: {
      _id: "u108",
      fullname: "Maria lavine",
      username: "maria78",
      imgUrl: "img/profile/p8/p8.jpg"
    },
    comments: [
      {
        id: "c101",
        by: {
          _id: "u106",
          fullname: "Sabina Duxbury",
          username: "Sabina_Dux28",
          imgUrl: "img/profile/p6/p6.jpg"
        },
        txt: "Cool!",
      },
      {
        id: "c1002",
        by: {
          _id: "u106",
          fullname: "Maurizio Ghiraldi",
          username: "Maurizio.Ghir1",
          imgUrl: "img/profile/p6/p6.jpg"
        },
        txt: "Nice",
      }
    ],
    likedBy: [
      {
        _id: "u106",
        fullname: "Maurizio Ghiraldi",
        username: "Maurizio.Ghir1",
        imgUrl: "img/profile/p6/p6.jpg"
      },
      {
        _id: "u106",
        fullname: "Sabina Duxbury",
        username: "Sabina_Dux28",
        imgUrl: "img/profile/p6/p6.jpg"
      }
    ],
    tags: []
  },
  {
    _id: "s134",
    txt: "Bridge",
    timestamp:1687183225000,
    imgUrl: "img/profile/p3/story/s3.jpg", 
    by: {
      _id: "u103",
      fullname: "Tailor Maiden",
      username: "tailor.m1",
      imgUrl: "img/profile/p3/p3.jpg"
    
    },
    comments: [
      {
        id: "c101",
        by: {
          _id: "u108",
          fullname: "Maria lavine",
          username: "maria78",
          imgUrl: "img/profile/p8/p8.jpg"
        },
        txt: "LOL!",
      },
      {
        id: "c1002",
        by: {
          _id: "u106",
          fullname: "Maurizio Ghiraldi",
          username: "Maurizio.Ghir1",
          imgUrl: "img/profile/p6/p6.jpg"
        },
        txt: "amazing",
      }
    ],
    likedBy: [
      {
        _id: "u106",
        fullname: "Maurizio Ghiraldi",
        username: "Maurizio.Ghir1",
        imgUrl: "img/profile/p6/p6.jpg"
      },
      {
        _id: "u106",
        fullname: "Sabina Duxbury",
        username: "Sabina_Dux28",
        imgUrl: "img/profile/p6/p6.jpg"
      }
    ],
    tags: []
  },
]
  /*
  [{
    _id: "p131",
    imgUrl: "img/explore/e1.jpg"
  },
  {
    _id: "p132",
    imgUrl: "img/explore/e2.jpg"
  },
  {
    _id: "p133",
    imgUrl: "img/explore/e3.jpg"
  },
  {
    _id: "p134",
    imgUrl: "img/explore/e4.jpg"
  },
  {
    _id: "p135",
    imgUrl: "img/explore/e5.jpg"
  },
  {
    _id: "p136",
    imgUrl: "img/explore/e6.jpg"
  },
  {
    _id: "p137",
    imgUrl: "img/explore/e7.jpg"
  },
  {
    _id: "p138",
    imgUrl: "img/explore/e8.jpg"
  },
  {
    _id: "p139",
    imgUrl: "img/explore/e9.jpg"
  },
  {
    _id: "p140",
    imgUrl: "img/explore/e10.jpg"
  },
  {
    _id: "p141",
    imgUrl: "img/explore/e11.jpg"
  },
  {
    _id: "p142",
    imgUrl: "img/explore/e12.jpg"
  },
  ]*/
  return explore
}

