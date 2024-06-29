import { useEffect, useState } from "react"
import { storyService } from "../../services/story.service.local"
import { SuggestionDeails } from "./SuggestionDetails"
export function Suggestions() {
  const LoggedInUser = storyService.getLoggedinUser()
  const suggestions = storyService.getSuggestions()

  return (
    <header className="suggestions">
      <SuggestionDeails user={LoggedInUser} action={"Switch"} />
      <div className="suggestion-options">
        <span>Suggestions For You</span>
        <a>See All</a>
      </div>
      {suggestions.map((suggestion) => (
        <span>
          <SuggestionDeails user={suggestion} action={"Follow"} />
        </span>
      ))}

      <footer className="suggestion-footer">
        <span className="more">
          About &bull; Help &bull; Press &bull; API &bull; Jobs &bull; Privacy
          &bull; Terms &bull; Locations &bull; Language &bull; Meta Verified
        </span>
        <span>&#169; 2023 INSTAGRAM</span>
      </footer>
    </header>
  )
}
