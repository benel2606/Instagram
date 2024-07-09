import { Link } from "react-router-dom"

// import { storyService } from "../../services/story.service.local"
export function UserDetails({
  user,
  underUser,
  action,
  onClickAction,
  comment,
}) {
  //   const user = storyService.getLoggedinUser()
  function getSubInfoByAction() {
    if (action == "Switch") return user.fullname
    else if (action == "Follow") return "Suggested for you"
    else if (action == "Time") return "1h"
    else if (action == "Preview") return user.fullname
    return ""
  }
  return (
    // <header className="user-details">
    //   <div className="main-user-info">
    //     <img className="main-user-img" src={`img${user.imgUrl}`} />
    //     <div className="main-user-details">
    //       <a>{user.username}</a>
    //       <span>{getSubInfoByAction()}</span>
    //     </div>
    //   </div>
    //   {action == "Switch" || action == "Follow" ? (
    //     <a className="main-user-action">{action}</a>
    //   ) : (
    //     ""
    //   )}
    // </header>

    <header className="user-details">
      <div className="main-user-info">
        <img className="main-user-img" src={`img${user.imgUrl}`} />
        <div className="main-user-details">
          <div>
            <Link to={`${user.username}`} className="username">
              {user.username}
            </Link>
            <span className="comment">{comment}</span>
          </div>
          <span className="under-user">{underUser}</span>
        </div>
      </div>
      {action !== "" ? <a className="main-user-action">{action}</a> : ""}
    </header>
  )
}
