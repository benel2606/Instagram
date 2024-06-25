import { NamePreview } from "../NamePreview"
import { ActionList } from "../ActionList"
export function StoryPreview({ story }) {
  return (
    <header className="story-preview">
      <header>
        <NamePreview by={story.by} />
      </header>
      <img src={`/img${story.imgUrl}`} />
      <footer>
        <ActionList />
      </footer>
    </header>
  )
}
