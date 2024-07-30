import { useEffect, useState } from "react"
import { MdGridOn } from "react-icons/md"
import { GoBookmark } from "react-icons/go"
import { PiIdentificationBadge } from "react-icons/pi"
import { storyService } from "../services/story.service.local"
import { userService } from "../services/user.service"
import { useSelector } from "react-redux"
import { loadStories, uploadStory } from "../store/story.actions"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { StoryModal } from "../cmps/Story/StoryModal"
import { loadUsers } from "../store/user.actions"

export function ProfileIndex() {
  const stories = useSelector((storeState) => storeState.storyModule.stories)
  const users = useSelector((storeState) => storeState.userModule.users)
  const navigate = useNavigate()
  const params = useParams()
  const [toggle, setToggle] = useState("posts")
  //const [loggedInUser, setLoggedInUser] = useState("")
  const [paramsUser, setParamsUser] = useState("")
  const loggedInUser = userService.getLoggedinUser()

  useEffect(() => {
    loadStories()
  }, [])

  useEffect(() => {
    getUser()
  }, [params.userId])

  async function getUser() {
    const foundUser = await userService.getByUsername(params.userId)
    setParamsUser(foundUser)
  }

  if (!paramsUser) return <div>loading...</div>

  async function updateUsers(user) {
    let followersToSave = [...user.followers]
    followersToSave.includes(loggedInUser._id)
      ? followersToSave.pop(loggedInUser._id)
      : followersToSave.push(loggedInUser._id)
    const userFollwersToSave = { ...user, followers: followersToSave }

    try {
      const savedUserFollower = await userService.saveLocalUser(
        userFollwersToSave
      )
    } catch (err) {
      console.log("Cannot update followers user" + err)
    }
    let fullLoggedInUser = await userService.getById(loggedInUser._id)
    let followingToSave = [...fullLoggedInUser.following]
    followingToSave.includes(user._id)
      ? followingToSave.pop(user._id)
      : followingToSave.push(user._id)
    const userFollowingToSave = {
      ...fullLoggedInUser,
      following: followingToSave,
    }

    try {
      const savedUserFolowing = await userService.saveLocalUser(
        userFollowingToSave
      )
      //setLoggedInUser(userFollowingToSave)
      getUser()
    } catch (err) {
      console.log("Cannot update following LoggedInUser" + err)
    }
  }
  const profileStories = stories.filter(
    (story) => story.by._id === paramsUser._id
  )
  console.log(profileStories)
  function cancelModal() {
    navigate(`/${paramsUser.username}`)
    uploadStory()
  }
  function onToggle(sw) {
    if (!paramsUser) return
    setToggle(sw)
  }
  const profileLinks = [
    { id: "posts", icon: <MdGridOn /> },
    { id: "saved", icon: <GoBookmark /> },
    { id: "tagged", icon: <PiIdentificationBadge /> },
  ]
  return (
    <div className="profile-index">
      <div className="profile-container">
        <header>
          <aside className="profile-img">
            <img src={paramsUser.imgUrl}></img>
          </aside>
          <aside className="profile-details">
            <section className="profile-username">
              <span>{paramsUser.username}</span>
              {loggedInUser._id == paramsUser._id ? (
                <div className="button-list">
                  <button>Edit profile</button>
                  <button>View archive</button>
                  <button>Ad tools</button>
                </div>
              ) : userService.isFollow(paramsUser) ? (
                <div className="button-list">
                  <button
                    className="action"
                    onClick={() => updateUsers(paramsUser)}
                  >
                    Following
                  </button>
                </div>
              ) : (
                <div className="button-list">
                  <button
                    className="following"
                    onClick={() => updateUsers(paramsUser)}
                  >
                    Follow
                  </button>
                </div>
              )}
            </section>
            <section className="profile-counters">
              <div>
                <span className="counter">1</span>
                <a> posts</a>
              </div>
              <div>
                <span className="counter">{paramsUser.followers.length}</span>
                <a> followers</a>
              </div>
              <div>
                <span className="counter">{paramsUser.following.length}</span>
                <a> following</a>
              </div>
            </section>
            <section className="profile-more-details">
              <div className="username">{paramsUser.username}</div>
              <div className="bio">{paramsUser.bio}</div>
            </section>
          </aside>
        </header>
        <main>
          {/* PROFILE LINKS */}
          <section className="profile-links">
            {profileLinks.map(({ id, icon }) => (
              <section
                key={id}
                onClick={() => setToggle(id)}
                className={`profile-pics-link ${toggle === id ? "active" : ""}`}
              >
                <a className={`${id}-icon`}>{icon}</a>
                {id}
              </section>
            ))}
          </section>
          {/* PROFILE STORIES */}
          <section className="profile-stories">
            {toggle === "posts" &&
              profileStories.map((story) => (
                <div
                  key={story._id}
                  onClick={() => navigate(`p/${story._id}`)}
                  className="story"
                >
                  <img key={story.imgUrl} src={story.imgUrl} />
                </div>
              ))}
          </section>
        </main>
        {params.storyId && (
          <StoryModal
            storyId={params.storyId} //new
            open={true}
            onCancel={cancelModal}
            footer=""
            //setStory={setStory}
          />
        )}
      </div>
    </div>
  )
}
