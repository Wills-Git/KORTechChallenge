import { useState, memo } from "react"
import { useAppSelector } from "@/redux/hooks.ts"
import { useAppDispatch } from "@/redux/hooks.ts"
import { useUpdateUserStatusMutation } from "@/redux/usersApiSlice.ts"
import type { FC, ChangeEvent } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card.tsx"
import { Badge } from "../ui/badge.tsx"
import { Textarea } from "../ui/textarea.tsx"
import { Label } from "../ui/label.tsx"
import PostsList from "../PostsList/PostsList.tsx"
import { logout } from "@/redux/currUserSlice.ts"
import useReduxErrorToast from "@/hooks/useReduxErrorToast.tsx"
import { useToast } from "../ui/use-toast.ts"



const MemoizedPostsList = memo(PostsList) //prevents rerendering when parent is rerendered, must be declared outside component
export const CurrUserDashboard: FC = () => {
  const [newStatus, setNewStatus] = useState("")
  const currUser = useAppSelector(state => state.currUser.user)
  const dispatch = useAppDispatch()
  const [updateUserStatus, { isLoading, isSuccess, isError, error }] =
    useUpdateUserStatusMutation()

  //toasts for errors and successes
  useReduxErrorToast(error, isError)
  const { toast } = useToast()

  const handleLogout = () => dispatch(logout())

  const handleUpdateStatus = () => {
    if (currUser && newStatus) {
    updateUserStatus({ PK: currUser.PK, status: newStatus })
    } else {
      toast({
        variant: "destructive",
        title: "Status Update Failed",
        description: "You are either not logged in or your status is empty.",
      })
    }
  }
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewStatus(e.target.value)
  }

  const userHasDefaultStatus =
    currUser && currUser.status === "User hasn't posted a status"

  if (!currUser) {
    return <div>Your dashboard is loading...</div>
  }


  return (
    <div className="max-h-full flex flex-col align-middle content-center gap-5 h-auto w-full max-w-md p-5 bg-popover rounded-lg shadow-xl text-popover-foreground">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <CardTitle className="text-2xl font-bold r text-pretty">
            {currUser.name}
          </CardTitle>
          <CardDescription>{currUser.PK}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Avatar className="hidden h-20 w-20 sm:flex shadow-xl border">
            <AvatarImage src={currUser.imageUrl} alt="Avatar" />
            <AvatarFallback>😃</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-4">
            <Badge className="drop-shadow-lg">Online</Badge>
            <Card>
              <CardContent>
                <div className="grid w-full mt-1 gap-1.5">
                  <Label htmlFor="message">New Status?</Label>
                  <Textarea
                  maxLength={150}
                    onChangeCapture={handleTextAreaChange}
                    placeholder={
                      userHasDefaultStatus
                        ? "Post your first status!"
                        : currUser.status
                    }
                    id="message"
                  />
                  <Button disabled={isLoading} onClick={handleUpdateStatus}>
                    {isLoading ? "Updating..." : "Update"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button
            className="absolute top-0 right-0 m-3 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
      <MemoizedPostsList />
    </div>
  )
}

export default CurrUserDashboard
