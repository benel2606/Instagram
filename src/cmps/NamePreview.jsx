import { BsThreeDots } from "react-icons/bs"
import { storyService } from "../services/story.service.local"
export function NamePreview({ by, time }) {
  return (
    <section className="name-preview">
      <div className="name-conatiner">
        <img src={by.imgUrl} />
        <a>{by.username}</a>
        <span>&bull;</span>
        <span>{storyService.formatTime(time)}</span>
      </div>
      <BsThreeDots />
    </section>
  )
}
