// import { storyService } from "../../services/story.service.local"
export function SuggestionDeails({ user, action }) {
  //   const user = storyService.getLoggedinUser()
  return (
    <header className="suggestion-details">
      <div className="main-user-info">
        <img className="main-user-img" src={`img${user.imgUrl}`} />
        <div className="main-user-username">
          <a>{user.username}</a>
          <span>{user.fullname}</span>
        </div>
      </div>
      <a className="main-user-action">{action}</a>
    </header>
  )
}
