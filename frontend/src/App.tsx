import "./App.css"
import "@radix-ui/themes/styles.css"
import { Button } from "@radix-ui/themes"
import axios from "axios"
import { useState } from "react"

const App = () => {
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState<string | null>(null)

  const dummyTestFunc = async () => {
    const dummyData = {
      userId: "123456",
      name: "John Doe",
      content: "Lorem ipsum dolor sit amet",
      imageUrl: "https://example.com/image.jpg",
      etc: "Some additional data",
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/testconnection/test",
        dummyData,
      )
      setResponseData(response.data)
      setError(null)
    } catch (error) {
      console.error("Error:", error)
      setError((error as Error).message || "Request Unsuccessful")
      setResponseData(null)
    }
  }

  const handleClick = () => {
    dummyTestFunc()
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={handleClick}>test connection</Button>
        {responseData && (
          <div>
            <h2>Response Data:</h2>
            <pre>{JSON.stringify(responseData, null, 1)}</pre>
          </div>
        )}
        {error && <div>Error: {error}</div>}
      </header>
    </div>
  )
}

export default App
