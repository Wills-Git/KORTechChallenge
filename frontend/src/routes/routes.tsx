import React from "react"
import { Routes, Route } from "react-router-dom"
import Landing from "../views/Landing/Landing.js"
import UserProfile from "../views/UserProfile/UserProfile.js"

import MyDashboard from "../views/MyDashboard/MyDashboard.js"

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="u">
      <Route path=":userid" element={<UserProfile />} />
      <Route path="self" element={<MyDashboard />} />
    </Route>
  </Routes>
)

export default AppRoutes
