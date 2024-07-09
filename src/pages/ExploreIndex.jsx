import { useEffect, useState } from "react"
import { ExploreList } from "../cmps/Explore/ExploreList"
import { storyService } from "../services/story.service.local"

export function ExploreIndex() {
  const [explore, setExplore] = useState(storyService.getExplore())
  console.log("ExploreIndex")
  const OuterComponent = (props) => (
    <div className="column">{this.props.children}</div>
  )
  return (
    <section className="explore-index">
      {explore.map((exploreItem, index) => (
        <img key={exploreItem._id} src={exploreItem.imgUrl} />
      ))}
      {/* <h1>Explore Index</h1>
      <ExploreList /> */}
    </section>
  )
}
