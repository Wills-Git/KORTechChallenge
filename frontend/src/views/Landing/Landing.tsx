import React from "react"
import LoginForm from "@/components/LoginForm/LoginForm.tsx"
import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button.tsx"
import "./layout.css"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import { cn } from "@/lib/utils.ts"

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
      <div className="layout">
        <div className="sidebar">
          <LoginForm />
        </div>
        <div className="users grid grid-cols-3 gap-2">
          {responseData &&
            responseData.users &&
            responseData.users.map(user => (
              <div key={user.id}>
                <div className="flex items-center place-content-center border-red-100 border-2  gap-4">
                  <Avatar className="hidden h-10 w-10 sm:flex">
                    <AvatarImage src={user.imageUrl} alt="Avatar" />
                    <AvatarFallback>😃</AvatarFallback>
                  </Avatar>
                  <div className="grid  gap-3">
                    <p className="text-sm font-medium text-pretty text-nowrap text-clip leading-none">
                      {user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">status:</p>
                  </div>
                  <Button variant="outline"> + </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Landing
