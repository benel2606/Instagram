// import { storyService } from "../../services/story.service.local"
export function SuggestionDeails({ user, action }) {
  //   const user = storyService.getLoggedinUser()
  return (
    <header className="suggestion-details">
      <div className="main-user-info">
        <img className="main-user-img" src={`img${user.imgUrl}`} />
        <div className="main-user-details">
          <a>{user.username}</a>
          <span>
            {action == "Switch" ? user.fullname : "Suggested for you"}
          </span>
        </div>
      </div>
      <a className="main-user-action">{action}</a>
    </header>
  )
}
