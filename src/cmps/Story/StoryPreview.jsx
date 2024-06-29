import { NamePreview } from "../NamePreview"
import { StoryActionList } from "../StoryActionList"
import { StoryFooter } from "../StoryFooter"
export function StoryPreview({ story }) {
  return (
    <header className="story-preview">
      <header>
        <NamePreview by={story.by} time={story.timestamp} />
      </header>
      <img className="story-image" src={`img${story.imgUrl}`} />
      {/* <section>
        <StoryActionList story={story} />
      </section> */}
      <StoryFooter story={story} />
    </header>
  )
}
