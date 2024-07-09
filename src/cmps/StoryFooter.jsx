import { StoryActionList } from "./StoryActionList"
import { StoryModal } from "./Story/StoryModal"
import { storyService } from "../services/story.service.local"
import { updateStory } from "../store/story.actions"
import { useState } from "react"
import { Link, Outlet } from "react-router-dom"

export function StoryFooter({ story, setStory }) {
  const lastUserLikedBy = story.likedBy.slice(-1)[0]
  const [inputTxt, setInputTxt] = useState("")
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
      <StoryActionList story={story} setStory={setStory} />
      <section className="likes-bar">
        <img src={`img${lastUserLikedBy.imgUrl}`} />
        <span>Liked by</span>
        <Link
          className="story-user-name link"
          to={`${lastUserLikedBy.username}`}
        >
          {lastUserLikedBy.username}
        </Link>
        and
        <a className="story-user-name link">{story.likedBy.length}</a>
        others
      </section>
      <section className="story-description">
        <a className="story-username" href={`/${story.by.username}`}>
          {story.by.username}
        </a>
        <span className="story-text"> {story.txt}</span>
      </section>
      <section className="story-comments">
        <Link to={`p/${story._id}`} className="view-all">
          View all {story.comments.length} comments
        </Link>
        {story.comments.length > 1
          ? story.comments
              .slice(story.comments.length - 1, story.comments.length)
              .map((comment) => (
                <div key={comment.id}>
                  <Link
                    className="story-username"
                    to={`${comment.by.username}`}
                  >
                    {comment.by.username}
                  </Link>
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
      {/* <Outlet open={true} onCancel={cancelModal} /> */}
      {/* <StoryModal story={story} open={isModalOpen} onCancel={cancelModal} /> */}
    </footer>
  )
}
