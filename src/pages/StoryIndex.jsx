import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { StoryList } from "../cmps/Story/StoryList"
import { Suggestions } from "../cmps/Story/Suggestions"
import {
  loadStories,
  addStory,
  updateStory,
  removeStory,
  addStoryMsg,
  loadStory,
} from "../store/story.actions"
import { storyService } from "../services/story.service"
import { useLocation } from "react-router-dom"
import { StoryModal } from "../cmps/Story/StoryModal"

export function StoryIndex() {
  const stories = useSelector((storeState) => storeState.storyModule.stories)
  const [story, setStory] = useState(null)
  const location = useLocation()
  const storyId = location.pathname.split("/p/")[1]
  console.log(storyId)
  useEffect(() => {
    loadStories()
  }, [])

  useEffect(() => {
    if (storyId) {
      getStoryById()
    }
  }, [storyId])
  async function getStoryById() {
    const storyToLoad = await loadStory(storyId)
    setStory(storyToLoad)
    console.log(storyToLoad)
  }
  function cancelModal() {}
  if (!stories || !stories.length) return <div>Loading...</div>
  return (
    <section className="story-index">
      <div className="container">
        <StoryList stories={stories} />
        <Suggestions />
      </div>
      {story && <StoryModal story={story} open={true} onCancel={cancelModal} />}
      {/* <img src={`src/assets/img${stories[0].imgUrl}`} /> */}
    </section>
  )
}
