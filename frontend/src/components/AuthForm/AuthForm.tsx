import { FC, useState, useEffect } from "react"
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
} from "@/redux/usersApiSlice.ts"
import { useToast } from "../ui/use-toast.ts"
import useReduxErrorToast from "@/hooks/useReduxErrorToast.tsx"
import { loginSuccess } from "@/redux/currUserSlice.ts"
import { useAppDispatch } from "@/redux/hooks.ts"
import type { UserInfoType } from "@/types/types.ts"
import { useDebouncedCallback } from "use-debounce"

export default function AuthForm() {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [isNameAvailable, setIsNameAvailable] = useState(true)

  const [createUser, { error, isError }] = useCreateUserMutation()
  const { data: allUsers } = useGetAllUsersQuery()
  const { toast } = useToast()
  useReduxErrorToast(error, isError)
  const dispatch = useAppDispatch()

  const handleSignup = async () => {
    // Validate username length
    if (username.length < 3 || username.length > 20) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Username must be between 3 and 20 characters long.",
      })
      return // Stop the signup process if validation fails
    }

    try {
      const response: UserInfoType = await createUser({
        username,
        name,
      }).unwrap()
      toast({
        variant: "positive",
        title: "Signup successful",
        description: "You have been signed up successfully!",
      })
      setIsSigningUp(false)
      dispatch(loginSuccess({ user: response }))
    } catch (error) {
      // Handle possible errors from the createUser function
      toast({
        variant: "destructive",
        title: "Signup Error",
        description: "An error occurred during signup. Please try again later.",
      })
    }
  }

  const handleLogin = () => {
    const user: UserInfoType | undefined = allUsers?.find(
      u => u.PK.substring(2) === username,
    )
    if (user) {
      dispatch(loginSuccess({ user }))
      setUsername("")
      setName("")
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          "No account found with that username. Please try again or sign up.",
      })
      setUsername("")
      setName("")
    }
  }

  const checkIfDisplayNameTaken = (
    userInput: string,
    currentData: UserInfoType[],
  ) => {
    return currentData.some(user => user.name === userInput)
  }

  const debouncedCheck = useDebouncedCallback(() => {
    const nameTaken = checkIfDisplayNameTaken(name, allUsers || [])
    setIsNameAvailable(!nameTaken)
  }, 300)

  useEffect(() => {
    debouncedCheck()
  }, [name, debouncedCheck])

//TODO: Refactor to use form properly

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {isSigningUp ? "Sign Up" : "Login"}
        </CardTitle>
        <CardDescription className="w-full break-words">
          {isSigningUp
            ? "Create your account"
            : "Enter your username to login to your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="username"
              required
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            {isSigningUp && (
              <>
                <Label htmlFor="displayname">Display Name</Label>
                <Input
                  id="displayName"
                  placeholder="your display name"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                />
              </>
            )}
          </div>
          <div className="space-y-1">
            {!isSigningUp ? (
              <>
                <Button className="w-full" type="submit" onClick={handleLogin}>
                  Login
                </Button>
                <Button className="w-full" onClick={() => setIsSigningUp(true)}>
                  Signup
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full"
                  onClick={handleSignup}
                  disabled={!isNameAvailable}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  className="w-full bg-muted-foreground"
                  onClick={() => setIsSigningUp(false)}
                >
                  Cancel Signup
                </Button>

                {!isNameAvailable && (
                  <Label className="text-red-500 text-xs" htmlFor="error">
                    That display name is already being used
                  </Label>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
