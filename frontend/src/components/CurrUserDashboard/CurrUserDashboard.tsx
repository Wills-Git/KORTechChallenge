import React from "react"
import { useAppSelector } from "@/redux/hooks.ts"
import { useAppDispatch } from "@/redux/hooks.ts"
import type { FC } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import type {
  CurrUserState,
  UserInfoProps,
  UserInfoType,
} from "@/types/types.ts"
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
export const CurrUserDashboard: FC = () => {
  const currUser = useAppSelector(state => state.currUser.user)
  const dispatch = useAppDispatch()

  const handleLogout = () => dispatch(logout())

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
              <CardContent className="">
                <div className="grid w-full mt-1 gap-1.5">
                  <Label htmlFor="message">New Status?</Label>
                  <Textarea placeholder={currUser.status} id="message" />
                  <Button>Update</Button>
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
      <PostsList />
    </div>
  )
}

export default CurrUserDashboard
