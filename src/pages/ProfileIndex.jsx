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
  const [loggedInUser, setLoggedInUser] = useState("")

  useEffect(() => {
    loadStories()
  }, [])

  useEffect(() => {
    getLoggedInUser()
  }, [params.userId])

  async function getLoggedInUser() {
    const foundUser = await userService.getByUsername(params.userId)
    setLoggedInUser(foundUser)
  }

  if (!loggedInUser) return <div>loading...</div>

  const profileStories = stories.filter(
    (story) => story.by._id === loggedInUser._id
  )

  function cancelModal() {
    navigate(`/${loggedInUser.username}`)
    uploadStory()
  }
  function onToggle(sw) {
    if (!loggedInUser) return
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
            <img src={`img${loggedInUser.imgUrl}`}></img>
          </aside>
          <aside className="profile-details">
            <section className="profile-username">
              <span>{loggedInUser.username}</span>
              <div className="button-list">
                <button>Edit profile</button>
                <button>View archive</button>
                <button>Ad tools</button>
              </div>
            </section>
            <section className="profile-counters">
              <div>
                <span className="counter">1</span>
                <a> posts</a>
              </div>
              <div>
                <span className="counter">{loggedInUser.followers.length}</span>
                <a> followers</a>
              </div>
              <div>
                <span className="counter">{loggedInUser.following.length}</span>
                <a> following</a>
              </div>
            </section>
            <section className="profile-more-details">
              <div className="username">{loggedInUser.username}</div>
              <div className="bio">{loggedInUser.bio}</div>
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
                  <img key={story.imgUrl} src={`img/${story.imgUrl}`} />
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
