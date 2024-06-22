import { ExplorePreview } from "./ExplorePreview"

export function ExploreList() {
  return (
    <header className="explore-list">
      <ExplorePreview id={1} />
      <ExplorePreview id={2} />
      <ExplorePreview id={3} />
      <ExplorePreview id={4} />
    </header>
  )
}
