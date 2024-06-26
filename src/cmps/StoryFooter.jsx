import { StoryActionList } from "./StoryActionList"
import { StoryModal } from "./Story/StoryModal"
import { storyService } from "../services/story.service.local"
import { BsThreeDots } from "react-icons/bs"
import {
  loadStories,
  addStory,
  updateStory,
  removeStory,
  addStoryMsg,
} from "../store/story.actions"
import { Button, Modal } from "antd"
import { useState } from "react"

export function StoryFooter({ story }) {
  const lastUserLikedBy = story.likedBy.slice(-1)[0]
  // let inputTxt
  const [inputTxt, setInputTxt] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  function showModal() {
    setIsModalOpen(true)
  }

  function cancelModal() {
    setIsModalOpen(false)
  }

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
    <footer className="story-footer">
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
      <section className="story-description">
        <a className="story-username" href={`/${story.by.username}`}>
          {story.by.username}
        </a>
        <span className="story-text"> {story.txt}</span>
      </section>
      <section className="story-comments">
        <div className="view-all" onClick={showModal}>
          View all {story.comments.length} comments
        </div>
        {story.comments.length > 1
          ? story.comments
              .slice(story.comments.length - 1, story.comments.length)
              .map((comment) => (
                <div key={comment.id}>
                  <a
                    className="story-username"
                    href={`/${comment.by.username}`}
                  >
                    {comment.by.username}
                  </a>
                  <span className="story-text"> {comment.txt}</span>
                </div>
              ))
          : ""}
      </section>
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
      <StoryModal story={story} open={isModalOpen} onCancel={cancelModal} />
    </footer>
  )
}
