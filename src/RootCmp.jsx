import React from "react"
import { Routes, Route } from "react-router"
import { LeftSideBar } from "./cmps/LeftSideBar.jsx"
import { StoryIndex } from "./pages/StoryIndex.jsx"
import { ExploreIndex } from "./pages/ExploreIndex.jsx"
import { MessageIndex } from "./pages/MessageIndex.jsx"

export function RootCmp() {
  return (
    <main className="root-app">
      <LeftSideBar />
      <Routes>
        <Route path="/Instagram" element={<StoryIndex />} />
        <Route path="/Instagram/explore" element={<ExploreIndex />} />
        <Route path="/Instagram/inbox" element={<MessageIndex />} />
      </Routes>
    </main>
  )
}
