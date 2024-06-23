import { useNavigate } from "react-router"
export function LeftSideBar() {
  const navigate = useNavigate()
  function onGoto(path) {
    console.log("onGoto")
    navigate(`/Instagram/${path}`)
  }
  return (
    <header className="left-side-var">
      <div onClick={() => onGoto("")}>Home</div>
      <div onClick={() => onGoto("explore")}>Explore</div>
      <div onClick={() => onGoto("inbox")}>Messages</div>
      <div to="notifications">Notifications</div>
      <div to="create">Create</div>
      <div to="profile">Profile</div>
    </header>
  )
}
