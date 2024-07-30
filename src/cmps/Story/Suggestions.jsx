import { useEffect, useState } from "react"
import { storyService } from "../../services/story.service.local"
import { UserDetails } from "../UserDetails"
import { userService } from "../../services/user.service"
export function Suggestions() {
  //const loggedInUser = storyService.getLoggedinUser()
  //const suggestions = userService.getSuggestions()
  const [suggestions, setSuggestions] = useState("")
  const [loggedInUser, setLoggedInUser] = useState({})

  useEffect(() => {
    getFullLoggedInUser()
    loadSuggestions()
  }, [])

  async function loadSuggestions() {
    const loadData = await userService.getSuggestions()
    setSuggestions(loadData)
  }

  async function getFullLoggedInUser() {
    const loggedin = await userService.getById("u10")
    setLoggedInUser(loggedin)
  }

  if (!loggedInUser) return <div></div>
  if (!suggestions) return <div></div>

  return (
    <header className="suggestions">
      <UserDetails
        user={loggedInUser}
        underUser={loggedInUser.fullname}
        action={"Switch"}
        onClickAction={""}
        comment={""}
      />
      <div className="suggestion-options">
        <span>Suggestions For You</span>
        <a>See All</a>
      </div>
      {suggestions.map((suggestion) => (
        <span key={suggestion._id}>
          {userService.isFollow(suggestion) ? (
            <UserDetails
              user={suggestion}
              underUser={"Suggested for you"}
              action={"Following"}
              onClickAction={""}
              comment={""}
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
            />
          ) : (
            <UserDetails
              user={suggestion}
              underUser={"Suggested for you"}
              action={"Follow"}
              onClickAction={""}
              comment={""}
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
            />
          )}
        </span>
      ))}

      <footer className="suggestion-footer">
        <span className="more">
          About &bull; Help &bull; Press &bull; API &bull; Jobs &bull; Privacy
          &bull; Terms &bull; Locations &bull; Language &bull; Meta Verified
        </span>
        <span>&#169; 2024 INSTAGRAM FROM META</span>
      </footer>
    </header>
  )
}
