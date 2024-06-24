// import { useNavigate } from "react-router"
import { GoHome, GoSearch } from "react-icons/go"
import { MdOutlineExplore } from "react-icons/md"
import { RiMessengerLine, RiAddBoxLine } from "react-icons/ri"
import { IoMdHeartEmpty } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import { NavLink, useNavigate } from "react-router-dom"
import { GoHomeFill } from "react-icons/go"

export function LeftSideBar() {
  const navigate = useNavigate()
  function onGoto(path) {
    console.log("onGoto")
    navigate(`/Instagram/${path}`)
  }
  return (
    <header className="left-side-bar">
      <nav>
        <div className="logo-container">
          <NavLink className="logo" to="">
            <img src="./src/assets/img/logo/instagram-log.png" />
          </NavLink>
        </div>

        <NavLink className="sidebar-btn" to="">
          <span className="sidbar-icon">
            <GoHomeFill className="icons" />
          </span>
          <span className="sidbar-name">Home</span>
        </NavLink>

        <NavLink className="sidebar-btn">
          <span className="sidbar-icon">
            <GoSearch className="icons" />
          </span>
          <span className="sidbar-name">Search</span>
        </NavLink>

        <NavLink className="sidebar-btn" to="explore">
          <span className="sidbar-icon">
            <MdOutlineExplore className="icons" />
          </span>
          <span className="sidbar-name">Explore</span>
        </NavLink>

        <NavLink className="sidebar-btn" to="inbox">
          <span className="sidbar-icon">
            <RiMessengerLine className="icons" />
          </span>
          <span className="sidbar-name">Messages</span>
        </NavLink>

        <NavLink className="sidebar-btn" to="">
          <span className="sidbar-icon">
            <IoMdHeartEmpty className="icons" />
          </span>
          <span className="sidbar-name">Notifications</span>
        </NavLink>

        <NavLink className="sidebar-btn" to="">
          <span className="sidbar-icon">
            <RiAddBoxLine className="icons" />
          </span>
          <span className="sidbar-name">Create</span>
        </NavLink>
        <NavLink className="sidebar-btn" to="">
          <span className="sidbar-icon">
            <CgProfile className="icons" />
          </span>
          <span className="sidbar-name">Profile</span>
        </NavLink>
      </nav>
      {/* <a href="./explore">Explore</a>
       <div onClick={() => onGoto("")}>Home</div>
      <div onClick={() => onGoto("explore")}>Explore</div>
      <div onClick={() => onGoto("inbox")}>Messages</div> 
      <div to="notifications">Notifications</div>
      <div to="create">Create</div>
      <div to="profile">Profile</div> */}
    </header>
  )
}
