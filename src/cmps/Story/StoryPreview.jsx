import { NamePreview } from "../NamePreview"
export function StoryPreview({ story }) {
  return (
    <header className="story-preview">
      <NamePreview by={story.by} />
      <img src={`src/assets/img${story.imgUrl}`} />
    </header>
  )
}
