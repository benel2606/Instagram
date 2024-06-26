import { NamePreview } from "../NamePreview"
import { StoryActionList } from "../StoryActionList"
export function StoryPreview({ story }) {
  return (
    <header className="story-preview">
      <header>
        <NamePreview by={story.by} />
      </header>
      <img className="story-image" src={`img${story.imgUrl}`} />
      <section>
        <StoryActionList story={story} />
      </section>
      <section className="likes-bar">
        <img src={`img${story.likedBy.slice(-1)[0].imgUrl}`} />
        <span>Liked by</span>
        <a className="story-user-name link" href="/shirid">
          {story.likedBy.slice(-1)[0].username}
        </a>
      </section>
    </header>
  )
}
