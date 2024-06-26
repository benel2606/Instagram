import { StoryPreview } from "./StoryPreview"

export function StoryList({ stories }) {
  return (
    <header className="story-list">
      <ul>
        {stories.map((story) => (
          <li key={story._id}>
            <StoryPreview story={story} />
          </li>
        ))}
      </ul>
    </header>
  )
}
