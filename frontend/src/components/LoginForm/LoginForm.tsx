import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useCreateUserMutation } from "@/redux/usersApiSlice.ts"
import { useGetAllUsersQuery } from "@/redux/usersApiSlice.ts"
import { useState, useEffect } from "react"
import { useToast } from "../ui/use-toast.ts"
import useReduxErrorToast from "@/hooks/useReduxErrorToast.tsx"
import type { UserInfoType } from "@/types/types.ts"
import { useDebouncedCallback } from "use-debounce"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [isSigningUp, setIsSigninUp] = useState(false)
  const [isNameAvailable, setIsNameAvailable] = useState(true)

  const [createUser, { error, isLoading, isSuccess, isError }] =
    useCreateUserMutation()
  const { data: allUsers } = useGetAllUsersQuery()

  const { toast } = useToast()
  //signup errors are handled with this hook
  useReduxErrorToast(error, isError)

  const handleSignup = async () => {
    await createUser({ username, name }).unwrap()
    toast({
      variant: "positive",
      title: "Signup successful",
      description: "You have been signed up successfully!",
    })
    setIsSigninUp(false)
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

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your username to login to your account
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
            {isSigningUp ? (
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
            ) : (
              <></>
            )}
          </div>
          <div className="space-y-1">
            {!isSigningUp ? (
              <>
                <Button className="w-full" type="submit">
                  Login
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setIsSigninUp(true)
                  }}
                  type="submit"
                >
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
                {!isNameAvailable && (
                  <Label className="text-red-500 text-xs" htmlFor="error">
                    that display name is already being used
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
