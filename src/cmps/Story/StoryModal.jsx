import { useState } from "react"
import { Modal } from "antd"
import { UserDetails } from "../UserDetails"
import { StoryActionList } from "../StoryActionList"
import { storyService } from "../../services/story.service.local"
import {
  loadStories,
  addStory,
  updateStory,
  removeStory,
  addStoryMsg,
} from "../../store/story.actions"
export function StoryModal({ story, open, onCancel }) {
  const [inputTxt, setInputTxt] = useState("")
  const lastUserLikedBy = story.likedBy.slice(-1)[0]
  function handleChange(ev) {
    setInputTxt(ev.target.value)
    console.log(inputTxt)
  }
  async function handleComment(ev) {
    ev.preventDefault()
    const commentsToSave = [...story.comments]
    commentsToSave.push(storyService.createComment(inputTxt))
    const stroyToSave = { ...story, comments: commentsToSave }
    try {
      const savedStory = await updateStory(stroyToSave)
      setInputTxt("")
    } catch (err) {
      console.log("Cannot update story" + err)
    }
  }
  return (
    <Modal width={"65%"} open={open} onCancel={onCancel} footer="">
      <article className="story-modal">
        <aside className="Left-side">
          <img src={`img${story.imgUrl}`} />
        </aside>
        <aside className="right-side">
          <header>
            <div className="user-name-preview">
              <UserDetails
                user={story.by}
                underUser={""}
                action={""}
                onClickAction={""}
                comment={""}
              />
            </div>
          </header>
          <main>
            <div className="story-description">
              <UserDetails
                user={story.by}
                underUser={storyService.formatTime(story.timestamp)}
                action={""}
                onClickAction={""}
                comment={story.txt}
              />
            </div>
            {story.comments
              ? story.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <UserDetails
                      user={comment.by}
                      underUser={"1h"}
                      action={""}
                      onClickAction={""}
                      comment={comment.txt}
                    />
                  </div>
                ))
              : ""}
          </main>
          <footer>
            <StoryActionList story={story} />
            <section className="likes-bar">
              <img src={`img${lastUserLikedBy.imgUrl}`} />
              <span>Liked by</span>
              <a
                className="story-user-name link"
                href={`/${lastUserLikedBy.username}`}
              >
                {lastUserLikedBy.username}
              </a>
              and
              <a story-user-name link>
                {story.likedBy.length}
              </a>
              others
            </section>
          </footer>
          <section className="write-comment">
            <form onSubmit={handleComment} action="#" className="comment-form">
              <input
                name="txt"
                className="comment-input"
                id="txt"
                onChange={handleChange}
                placeholder="Add a comment..."
                value={inputTxt}
              />
            </form>
          </section>
        </aside>
      </article>
    </Modal>
  )
}
