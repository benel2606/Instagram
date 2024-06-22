import { StoryPreview } from "./StoryPreview"

export function StoryList() {
  return (
    <header className="story-list">
      <StoryPreview id={1} />
      <StoryPreview id={2} />
      <StoryPreview id={3} />
      <StoryPreview id={4} />
    </header>
  )
}
