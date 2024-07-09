import { useState, useEffect } from "react"
import { Modal, Button } from "antd"
import { UserDetails } from "../UserDetails"
import { StoryActionList } from "../StoryActionList"
import { storyService } from "../../services/story.service.local"
import {
  loadStories,
  loadStory,
  addStory,
  updateStory,
  removeStory,
  addStoryMsg,
} from "../../store/story.actions"
import { useLocation } from "react-router-dom"
import { userService } from "../../services/user.service"

export function CreateDetails({ image, handleCancel }) {
  const [newStory, setNewStory] = useState(storyService.getEmptyStory())
  const [inputTxt, setInputTxt] = useState("")
  function handleChange({ target }) {
    console.log("here")
    let { value, type, name: field } = target
    setNewStory((prevStory) => ({
      ...prevStory,
      [field]: value,
      imgUrl: image,
      timestamp: new Date().getTime(),
    }))
  }
  const loggedInUser = userService.getLoggedinUser()
  function onSaveStory() {
    console.log(newStory)
    addStory(newStory).then(() => {
      handleCancel()
    })
  }
  if (!image) return <div>Loading..</div>
  return (
    <article className="create-deatils">
      <section className="img-section">
        <img src={image} />
      </section>
      <section className="post-info">
        <div className="post-user-info">
          <section>
            <img src={loggedInUser.imgUrl} />
            <span>{loggedInUser.username}</span>
          </section>
          <form>
            <label htmlFor="text"></label>
            <textarea
              type="text"
              name="txt"
              id="txt"
              placeholder="Write a caption..."
              value={newStory.txt}
              onChange={handleChange}
            />
          </form>
        </div>
        <div>
          <Button onClick={onSaveStory} size={"middle"} type="primary">
            Share
          </Button>
        </div>
      </section>
    </article>
  )
}
