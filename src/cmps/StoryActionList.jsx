import { FiSend } from "react-icons/fi"
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa"
import {
  loadStories,
  addStory,
  updateStory,
  removeStory,
  addStoryMsg,
} from "../store/story.actions"
import { storyService } from "../services/story.service.local"

export function StoryActionList({ story }) {
  async function handleLike() {
    let likeByToSave = []
    const likedByMe = story.likedBy.some((user) => user._id == "u10")
    if (likedByMe) {
      likeByToSave = story.likedBy.filter((user) => user._id != "u10")
    } else {
      likeByToSave = [...story.likedBy]
      likeByToSave.push(storyService.getLoggedinUser())
    }
    const stroyToSave = { ...story, likedBy: likeByToSave }
    try {
      const savedStory = await updateStory(stroyToSave)
    } catch (err) {
      console.log("Cannot update story" + err)
    }
  }

  const isLikedByMe = story.likedBy.some((user) => user._id == "u10")
  return (
    <section className="story-action-list">
      <aside className="left-list">
        {isLikedByMe ? (
          <FaHeart color={"red"} onClick={handleLike} />
        ) : (
          <FaRegHeart onClick={handleLike} />
        )}
        <FaRegComment />
        <FiSend />
      </aside>
      <aside className="right-list">
        <FaRegBookmark />
      </aside>
    </section>
  )
}
