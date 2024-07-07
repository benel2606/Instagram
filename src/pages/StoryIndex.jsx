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
import { storyService } from "../services/story.service.local"
import { useLocation, useNavigate } from "react-router-dom"
import { StoryModal } from "../cmps/Story/StoryModal"

export function StoryIndex() {
  const stories = useSelector((storeState) => storeState.storyModule.stories)
  //const story = useSelector((storeState) => storeState.storyModule.story)

  const [story, setStory] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const storyId = location.pathname.split("/p/")[1]
  console.log("storyId", storyId)
  useEffect(() => {
    loadStories()
  }, [])

  useEffect(() => {
    if (storyId) {
      //loadStory(storyId)
      getStoryById()
      console.log("story-useEffect", story)
    }
  }, [storyId])
  console.log("story", story)
  async function getStoryById() {
    const storyToLoad = await storyService.getById(storyId)
    setStory(storyToLoad)
  }
  function cancelModal() {
    setStory(null)
    navigate("/")
  }
  if (!stories || !stories.length) return <div>Loading...</div>
  return (
    <section className="story-index">
      {/* <div className="container"> */}
      <StoryList stories={stories} />
      <Suggestions />
      {/* </div> */}
      {story && (
        <StoryModal
          story={story}
          open={true}
          onCancel={cancelModal}
          setStory={setStory}
        />
      )}
    </section>
  )
}
