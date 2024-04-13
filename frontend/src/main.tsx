import React from "react"
import { Theme } from "@radix-ui/themes"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App.js"
import { store } from "./app/store.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./index.css"



const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Router>
        <Theme>
          <Provider store={store}>
            <App />
          </Provider>
        </Theme>
      </Router>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
