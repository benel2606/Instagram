import React from "react"
import { Routes, Route } from "react-router-dom"
import { LeftSideBar } from "./cmps/LeftSideBar.jsx"
import { StoryIndex } from "./pages/StoryIndex.jsx"
import { ExploreIndex } from "./pages/ExploreIndex.jsx"
import { MessageIndex } from "./pages/MessageIndex.jsx"
import { StoryModal } from "./cmps/Story/StoryModal.jsx"
import { ProfileIndex } from "./pages/ProfileIndex.jsx"

export function RootCmp() {
  return (
    <main className="root-app">
      <LeftSideBar />
      <section className="page-container">
        <Routes>
          {/* <Route path="/" element={<StoryIndex />} /> */}
          <Route path="/" element={<StoryIndex />}>
            <Route path="p/:storyId" element={<StoryModal />} />
          </Route>
          <Route path="explore" element={<ExploreIndex />}>
            <Route path="p/:storyId" element={<StoryModal />} />
          </Route>
          <Route path="/:userId" element={<ProfileIndex />}>
            <Route path="p/:storyId" element={<StoryModal />} />
          </Route>
          <Route path="inbox" element={<MessageIndex />} />
        </Routes>
      </section>
    </main>
  )
}
