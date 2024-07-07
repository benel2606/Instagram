import { useEffect, useState } from "react"
import { MdGridOn } from "react-icons/md"
import { GoBookmark } from "react-icons/go"
import { PiIdentificationBadge } from "react-icons/pi"
import { storyService } from "../services/story.service.local"
import { useSelector } from "react-redux"
import { loadStories } from "../store/story.actions"
import { useLocation, useNavigate } from "react-router-dom"
import { StoryModal } from "../cmps/Story/StoryModal"
export function ProfileIndex() {
  const stories = useSelector((storeState) => storeState.storyModule.stories)
  const navigate = useNavigate()
  const [toggle, setToggle] = useState("posts")
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    loadStories()
  }, [])
  const loggedInUser = storyService.getLoggedinUser()
  const profileStories = stories.filter(
    (story) => story.by._id === loggedInUser._id
  )
  function onToggle(sw) {
    if (!loggedInUser) return
    setToggle(sw)
  }
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
          <section className="profile-links">
            <section
              onClick={() => setToggle("posts")}
              className={
                toggle === "posts"
                  ? "profile-pics-link active"
                  : "profile-pics-link"
              }
            >
              <a className="posts-icon">
                <MdGridOn />
              </a>
              POSTS
            </section>
            <section
              onClick={() => onToggle("saved")}
              className={
                toggle === "saved"
                  ? "profile-pics-link active"
                  : "profile-pics-link"
              }
            >
              <a className="saved-icon">
                <GoBookmark />
              </a>
              SAVED
            </section>
            <section
              onClick={() => onToggle("tagged")}
              className={
                toggle === "tagged"
                  ? "profile-pics-link active"
                  : "profile-pics-link"
              }
            >
              <a className="tagged-icon">
                <PiIdentificationBadge />
              </a>
              TAGGED
            </section>
          </section>
          {toggle === "posts" ? (
            <section className="profile-stories">
              {profileStories.map((story) => (
                <div
                  key={story._id}
                  onClick={() => navigate(`/p/${story._id}`)}
                  className="story"
                >
                  <img key={story.imgUrl} src={`img/${story.imgUrl}`} />
                </div>
              ))}
            </section>
          ) : (
            <section className="profile-stories"></section>
          )}
        </main>
      </div>
    </div>
  )
}
