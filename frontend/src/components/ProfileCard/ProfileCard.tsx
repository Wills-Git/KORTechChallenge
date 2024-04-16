import type { FC } from "react"
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

const ProfileCard: FC<UserInfoProps> = ({ userInfo }) => {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <CardTitle className="text-2xl font-bold r text-pretty">
          {userInfo.name}
        </CardTitle>
        <CardDescription>{userInfo.PK}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="hidden h-20 w-20 sm:flex">
          <AvatarImage src={userInfo.imageUrl} alt="Avatar" />
          <AvatarFallback>😃</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-4">
          <Badge className="drop-shadow-lg">Status</Badge>
          <Card>
            <CardContent className="">
              <small className="w-full max-w-full whitespace-normal break-all text-xs font-medium leading-none">
                {userInfo.status}
              </small>
            </CardContent>
          </Card>
        </div>
        <Button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:text-foreground"
          onClick={() => console.log("Request Friend")}
        >
          Friend Request
        </Button>
        <Button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={() => console.log("Block User")}
        >
          Block User
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
