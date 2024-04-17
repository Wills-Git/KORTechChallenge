import type { FC } from "react"
import { SkipToken, skipToken } from "@reduxjs/toolkit/query"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import type { UserInfoProps } from "@/types/types.ts"
import { Button } from "@/components/ui/button.tsx"
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card.tsx"
import { Badge } from "../ui/badge.tsx"
import { useAppSelector } from "@/redux/hooks.ts"
import { useUpdateFriendStatusMutation } from "@/redux/friendsApiSlice.ts"
import { useGetAllFriendStatusesQuery } from "@/redux/friendsApiSlice.ts"
import useReduxErrorToast from "@/hooks/useReduxErrorToast.tsx"
import { DynamoDBItem } from "../../types/types.ts"
import { DynamoDBItem } from '../../types/types';

const ProfileCard: FC<UserInfoProps> = ({ userInfo }) => {
  const currUser = useAppSelector(state => state.currUser.user)

  const [updateFriendStatus, { isError, error, isSuccess }] =
    useUpdateFriendStatusMutation()

  useReduxErrorToast(error, isError)

  const { data: friendStatuses } = useGetAllFriendStatusesQuery(
    currUser?.PK ?? skipToken,
  ) //skiptoken is a typesafe method to skip query if value is undefined

  function findStatusBySK(items: DynamoDBItem[], skValue: string) {
    if(!items) throw Error
    
      for (const item of items) {
        if (item.SK.S === skValue) {
          return item.Status.S
        }
      }
    
    return null
  }
//   const friendStatus = findStatusBySK(friendStatuses is DynamoDBItem[], userInfo.PK)

  const handleRequestFriend = async () => {
    if (!currUser || !userInfo) {
      console.error("Invalid user data")
      return // Exit if user data is incomplete
    }
    const userRequesting = currUser?.PK
    const userBeingRequested = userInfo.PK
    try {
      const result = await updateFriendStatus({
        userPK: userRequesting,
        requestedUserPK: userBeingRequested,
        status: "requested",
      }).unwrap()

      console.log("Friend request sent successfully:", result)
    } catch (error) {
      console.error("Failed to send friend request:", error)
    }
  }

  const userHasDefaultStatus = userInfo.status === "User hasn't posted a status"
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <CardTitle className="text-2xl font-bold r text-pretty">
          {userInfo.name}
        </CardTitle>
        <CardDescription>{userInfo.PK}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="hidden h-20 w-20 sm:flex  shadow-xl border">
          <AvatarImage src={userInfo.imageUrl} alt="Avatar" />
          <AvatarFallback>😃</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-4">
          <Badge className="drop-shadow-lg bg-muted bg-gradient-to-br text-muted-foreground">
            Offline
          </Badge>
          <Card className="">
            <CardContent className="px-5 pt-2 pb-4">
              <small
                className={`w-full max-w-full whitespace-normal break-all text-xs font-medium leading-none ${userHasDefaultStatus ? "text-muted-foreground" : "text-black"}`}
              >
                {userInfo.status}
              </small>
            </CardContent>
          </Card>
        </div>
        {currUser && (
          <>
            {isSuccess ? (
              <Button
                className="mt-4 rounded bg-muted-foreground px-4 py-2 text-white hover:text-foreground"
                disabled
              >
                Pending
              </Button>
            ) : (
              <Button
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:text-foreground"
                onClick={handleRequestFriend}
              >
                Friend Request
              </Button>
            )}
            <Button
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={() => console.log("Block User")}
            >
              Block User
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ProfileCard
