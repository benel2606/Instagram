import { BsThreeDots } from "react-icons/bs"

export function NamePreview({ by, time }) {
  return (
    <section className="name-preview">
      <div className="conatiner">
        <img src={`/img${by.imgUrl}`} />
        <a>{by.username}</a>
        <span>&bull;</span>
        <span>1h</span>
      </div>
      <BsThreeDots />
    </section>
  )
}
