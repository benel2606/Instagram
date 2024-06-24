import { ExploreList } from "../cmps/Explore/ExploreList"

export function ExploreIndex() {
  console.log("ExploreIndex")
  return (
    <section className="explore-index">
      <h1>Explore Index</h1>
      <ExploreList />
    </section>
  )
}
