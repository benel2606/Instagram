import { Link } from "react-router-dom"
import { userService } from "../services/user.service"
import { storyService } from "../services/story.service.local"

// import { storyService } from "../../services/story.service.local"
export function UserDetails({
  user,
  underUser,
  action,
  onClickAction,
  comment,
  loggedInUser,
  setLoggedInUser,
  suggestions,
  setSuggestions,
}) {
  //const loggedInUser = storyService.getLoggedinUser()
  //   const user = storyService.getLoggedinUser()
  // function getSubInfoByAction() {
  //   if (action == "Switch") return user.fullname
  //   else if (action == "Follow") return "Suggested for you"
  //   else if (action == "Time") return "1h"
  //   else if (action == "Preview") return user.fullname
  //   return ""
  // }
  async function updateUsers(user) {
    let followersToSave = [...user.followers]
    followersToSave.push(loggedInUser._id)
    const userFollwersToSave = { ...user, followers: followersToSave }
    try {
      const savedUserFollower = await userService.saveLocalUser(
        userFollwersToSave
      )
    } catch (err) {
      console.log("Cannot update followers user" + err)
    }

    let followingToSave = [...loggedInUser.following]
    followingToSave.push(user._id)
    const userFollowingToSave = { ...loggedInUser, following: followingToSave }

    try {
      const savedUserFolowing = await userService.saveLocalUser(
        userFollowingToSave
      )
      setLoggedInUser(userFollowingToSave)
    } catch (err) {
      console.log("Cannot update following LoggedInUser" + err)
    }
  }
  return (
    <header className="user-details">
      <div className="main-user-info">
        <img className="main-user-img" src={user.imgUrl} />
        <div className="main-user-details">
          <div>
            <Link to={`/${user.username}`} className="username">
              {user.username}
            </Link>
            <span className="comment">{comment}</span>
          </div>
          <span className="under-user">{underUser}</span>
        </div>
      </div>
      {action !== "" ? <div className="main-user-action">{action}</div> : ""}
    </header>
  )
}
