import "./App.css"
import "@radix-ui/themes/styles.css"
import { Button } from "@radix-ui/themes"
import axios from "axios"
import { useState } from "react"
import { Rollup } from "vite"
import AppRoutes from "./routes/routes.js"

const App = () => {


  return (
    <div className="App">
      <AppRoutes />
    </div>
  )
}

export default App
