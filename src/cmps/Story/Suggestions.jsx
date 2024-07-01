import { useEffect, useState } from "react"
import { storyService } from "../../services/story.service.local"
import { UserDetails } from "../UserDetails"
export function Suggestions() {
  const loggedInUser = storyService.getLoggedinUser()
  const suggestions = storyService.getSuggestions()

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
          <UserDetails
            user={suggestion}
            underUser={"Suggested for you"}
            action={"Follow"}
            onClickAction={""}
            comment={""}
          />
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
