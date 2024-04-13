import React from "react"
import { Routes, Route } from "react-router-dom"
import Landing from "../views/Landing/Landing.js"
import UserProfile from "../views/UserProfile/UserProfile.js"
import UsersList from "../views/UsersList/UsersList.js"
import MyDashboard from "../views/MyDashboard/MyDashboard.js"

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="u">
      <Route path="userlist" element={<UsersList />} />
      <Route path=":userid" element={<UserProfile />} />
      <Route path="self" element={<MyDashboard />} />
    </Route>
  </Routes>
)

export default AppRoutes
