import { useEffect } from "react"
import { useSelector } from "react-redux"
import { StoryList } from "../cmps/Story/StoryList"
import {
  loadStories,
  addStory,
  updateStory,
  removeStory,
  addStoryMsg,
} from "../store/story.actions"
import { storyService } from "../services/story.service"
export function StoryIndex() {
  const stories = useSelector((storeState) => storeState.storyModule.stories)
  useEffect(() => {
    loadStories()
  }, [])
  if (!stories || !stories.length) return <div>Loading...</div>
  return (
    <section className="story-index">
      <h1>Story Index</h1>
      {/* <img src={`src/assets/img${stories[0].imgUrl}`} /> */}
      <StoryList />
    </section>
  )
}
