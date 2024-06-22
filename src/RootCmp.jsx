import React from "react"
import { Routes, Route } from "react-router"

// import { HomePage } from "./pages/HomePage"
// import { AboutUs, AboutTeam, AboutVision } from "./pages/AboutUs"
// import { CarIndex } from "./pages/CarIndex.jsx"
// import { BoardIndex } from "./pages/BoardIndex.jsx"
// import { ReviewIndex } from "./pages/ReviewIndex.jsx"
// import { ChatApp } from "./pages/Chat.jsx"
//import { AdminIndex } from "./pages/AdminIndex.jsx"

// import { CarDetails } from "./pages/CarDetails"
// import { UserDetails } from "./pages/UserDetails"
// import { BoardDetails } from "./pages/BoardDetails"
// import { TaskDetails } from "./pages/TaskDetails"

// import { AppHeader } from "./cmps/AppHeader"
// import { AppFooter } from "./cmps/AppFooter"
import { LeftSideBar } from "./cmps/LeftSideBar.jsx"
import { StoryIndex } from "./pages/StoryIndex.jsx"

export function RootCmp() {
  return (
    <main className="root-app">
      <LeftSideBar />
      <Routes>
        <Route path="/Instagram" element={<StoryIndex />} />
      </Routes>
    </main>
  )
}
