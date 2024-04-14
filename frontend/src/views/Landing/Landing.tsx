import React from "react"
import { useState } from "react"
import axios from "axios"
import { Button } from "@radix-ui/themes"

function Landing() {
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
    <>
      <div>Landing</div>
      <Button onClick={handleClick}>test</Button>
      {responseData &&
        responseData.users &&
        responseData.users.map(user => (
          <div key={user.id}>
            {" "}
            {/* Ensure each child in a list has a unique "key" prop. */}
            {user.name}{" "}
            {/* Example: Accessing the name property of each user */}
          </div>
        ))}
    </>
  )
}

export default Landing