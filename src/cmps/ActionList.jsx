import { FiSend } from "react-icons/fi"
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa"

export function ActionList({ by, time }) {
  return (
    <section className="action-list">
      <aside className="left-list">
        <FaRegHeart />
        <FaRegComment />
        <FiSend />
      </aside>
      <aside className="right-list">
        <FaRegBookmark />
      </aside>
    </section>
  )
}
