import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { LeftSideBar } from "../cmps/LeftSideBar"
import { StoryIndex } from "./StoryIndex"

export function HomePage() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()

  return (
    <header className="home-page">
      <StoryIndex />
    </header>
  )
}
