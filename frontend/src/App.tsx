import "./App.css"
import "@radix-ui/themes/styles.css"
import AppRoutes from "./routes/routes.js"
import { Toaster } from "./components/ui/toaster.tsx"

const App = () => {
  return (
    <div className="App">
      <AppRoutes />
      <Toaster/>
    </div>
  )
}

export default App
