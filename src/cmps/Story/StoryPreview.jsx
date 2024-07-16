import { StoryFooter } from "../StoryFooter"
import { BsThreeDots } from "react-icons/bs"
import { storyService } from "../../services/story.service.local"
import { Button, Dropdown, Space } from "antd"
import {
  loadStories,
  addStory,
  updateStory,
  removeStory,
  addStoryMsg,
} from "../../store/story.actions"
import { Link } from "react-router-dom"
import { userService } from "../../services/user.service"
export function StoryPreview({ story }) {
  function deleteHandle(id) {
    removeStory(id)
  }
  var items = [
    {
      key: "1",
      label: <a onClick={() => deleteHandle(story._id)}>Delete</a>,
    },
  ]
  var loggedInUser = userService.getLoggedinUser()
  return (
    <header className="story-preview">
      <header>
        <section className="name-preview">
          <div className="name-conatiner">
            <img src={story.by.imgUrl} />
            <Link to={story.by.username}>{story.by.username}</Link>
            <span>&bull;</span>
            <span>{storyService.formatTime(story.timestamp)}</span>
          </div>
          {loggedInUser._id == story.by._id ? (
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <BsThreeDots />
            </Dropdown>
          ) : (
            <BsThreeDots />
          )}
        </section>
      </header>
      <img className="story-image" src={story.imgUrl} />
      {/* <section>
        <StoryActionList story={story} />
      </section> */}
      <StoryFooter story={story} />
    </header>
  )
}
