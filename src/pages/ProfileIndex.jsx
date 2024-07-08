import { useEffect, useState } from "react"
import { MdGridOn } from "react-icons/md"
import { GoBookmark } from "react-icons/go"
import { PiIdentificationBadge } from "react-icons/pi"
import { storyService } from "../services/story.service.local"
import { useSelector } from "react-redux"
import { loadStories } from "../store/story.actions"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { StoryModal } from "../cmps/Story/StoryModal"
export function ProfileIndex() {
  const stories = useSelector((storeState) => storeState.storyModule.stories)
  const navigate = useNavigate()
  const params = useParams()
  const [toggle, setToggle] = useState("posts")
  useEffect(() => {
    loadStories()
  }, [])
  const loggedInUser = storyService.getLoggedinUser()
  const profileStories = stories.filter(
    (story) => story.by._id === loggedInUser._id
  )
  function cancelModal() {
    navigate(`/${loggedInUser.username}`)
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
              <span>{loggedInUser.username}</span>
            </section>
          </aside>
        </header>
        <main>
          {/* PROFILE LINKS */}
          <section className="profile-links">
            {profileLinks.map(({ id, icon }) => (
              <section
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
            //setStory={setStory}
          />
        )}
      </div>
    </div>
  )
}
