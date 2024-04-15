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

const ProfileCard: FC<UserInfoProps> = ({ userInfo }) => {
  return (<>
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-pretty">{userInfo.name}</CardTitle>
        <CardDescription>{userInfo.status}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Avatar className="hidden h-20 w-20 sm:flex">
          <AvatarImage src={userInfo.imageUrl} alt="Avatar" />
          <AvatarFallback>😃</AvatarFallback>
        </Avatar>
      </CardContent>
    </Card>
    </>
  )
}

export default ProfileCard
