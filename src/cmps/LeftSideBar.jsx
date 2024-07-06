// import { useNavigate } from "react-router"
import { GoHome, GoSearch } from "react-icons/go"
import { MdOutlineExplore, MdExplore } from "react-icons/md"
import { RiMessengerLine, RiMessengerFill, RiAddBoxLine } from "react-icons/ri"
import { IoMdHeartEmpty } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { GoHomeFill } from "react-icons/go"
import { useState } from "react"
import { CreateModal } from "./Create/CreateModal"

export function LeftSideBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [openCreateModal, setOpenCreateModal] = useState(false)
  function onGoto(path) {
    console.log("onGoto")
    navigate(`/Instagram/${path}`)
  }
  const isActive = (path) => location.pathname == path
  console.log(location)
  return (
    <header className="left-side-bar">
      <nav>
        <div className="logo-container">
          <NavLink className="logo" to="">
            <img src="img/logo/instagram-log.png" />
          </NavLink>
        </div>
        <NavLink className={`sidebar-btn`} to="">
          <span className="sidbar-icon">
            {isActive("/") ? (
              <GoHomeFill className="icons" />
            ) : (
              <GoHome className="icons" />
            )}
          </span>
          <span className="sidbar-name">Home</span>
        </NavLink>

        <Link className="sidebar-btn" to="">
          <span className="sidbar-icon">
            <GoSearch className="icons" />
          </span>
          <span className="sidbar-name">Search</span>
        </Link>

        <NavLink className="sidebar-btn" to="explore">
          <span className="sidbar-icon">
            {isActive("/explore") ? (
              <MdExplore className="icons" />
            ) : (
              <MdOutlineExplore className="icons" />
            )}
          </span>
          {/* <span className={`material-symbols-outlined ${isActive("/explore") ? "fill" : ""}`}> explore </span>*/}
          <span className="sidbar-name">Explore</span>
        </NavLink>

        <NavLink className="sidebar-btn" to="inbox">
          <span className="sidbar-icon">
            {isActive("/inbox") ? (
              <RiMessengerFill className="icons" />
            ) : (
              <RiMessengerLine className="icons" />
            )}
          </span>
          <span className="sidbar-name">Messages</span>
        </NavLink>

        <Link className="sidebar-btn" to="">
          <span className="sidbar-icon">
            <IoMdHeartEmpty className="icons" />
          </span>
          <span className="sidbar-name">Notifications</span>
        </Link>

        <div className="sidebar-btn" onClick={() => setOpenCreateModal(true)}>
          <span className="sidbar-icon">
            <RiAddBoxLine className="icons" />
          </span>
          <span className="sidbar-name">Create</span>
        </div>
        <NavLink className="sidebar-btn" to="ben_aharon">
          <span className="sidbar-icon">
            <CgProfile className="icons" />
          </span>
          <span className="sidbar-name">Profile</span>
        </NavLink>
      </nav>
      {openCreateModal && (
        <CreateModal setOpenCreateModal={setOpenCreateModal} />
      )}
    </header>
  )
}
