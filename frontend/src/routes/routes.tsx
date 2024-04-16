import React from "react"
import { Routes, Route } from "react-router-dom"
import Landing from "../views/Landing/Landing.js"

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
  </Routes>
)

export default AppRoutes
