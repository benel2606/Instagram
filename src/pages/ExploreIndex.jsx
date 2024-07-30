import { useEffect, useState } from "react"
import { ExploreList } from "../cmps/Explore/ExploreList"
import { storyService } from "../services/story.service.local"
import { uploadStory } from "../store/story.actions"
import { Link, useNavigate, useParams } from "react-router-dom"
import { StoryModal } from "../cmps/Story/StoryModal"

export function ExploreIndex() {
  const [explore, setExplore] = useState(storyService.getExplore())
  const navigate = useNavigate()
  const params = useParams()

  const OuterComponent = (props) => (
    <div className="column">{this.props.children}</div>
  )
  function cancelModal() {
    navigate("/explore")
    uploadStory()
  }
  return (
    <section className="explore-index">
      {explore.map((exploreItem, index) => (
        <Link to={`p/${exploreItem._id}`}>
          <img key={exploreItem._id} src={exploreItem.imgUrl} />
        </Link>
      ))}
      {/* <h1>Explore Index</h1>
      <ExploreList /> */}
      {params.storyId && (
        <StoryModal
          storyId={params.storyId}
          open={true}
          onCancel={cancelModal}
          footer=""
          //setStory={setStory}
        />
      )}
    </section>
  )
}
