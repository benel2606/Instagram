import { StoryFooter } from "../StoryFooter"
import { BsThreeDots } from "react-icons/bs"
import { storyService } from "../../services/story.service.local"
import {
  loadStories,
  addStory,
  updateStory,
  removeStory,
  addStoryMsg,
} from "../../store/story.actions"
export function StoryPreview({ story }) {
  function deleteHandle(id) {
    removeStory(id)
  }
  return (
    <header className="story-preview">
      <header>
        <section className="name-preview">
          <div className="name-conatiner">
            <img src={`img${story.by.imgUrl}`} />
            <a>{story.by.username}</a>
            <span>&bull;</span>
            <span>{storyService.formatTime(story.timestamp)}</span>
          </div>
          <BsThreeDots onClick={() => deleteHandle(story._id)} />
        </section>
      </header>
      <img className="story-image" src={`img${story.imgUrl}`} />
      {/* <section>
        <StoryActionList story={story} />
      </section> */}
      <StoryFooter story={story} />
    </header>
  )
}
