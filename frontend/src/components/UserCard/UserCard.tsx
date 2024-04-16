import type { FC } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import type { UserInfoProps } from "@/types/types.ts"
import { Button } from "@/components/ui/button.tsx"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx"
import ProfileCard from "../ProfileCard/ProfileCard.tsx"
import PostsList from "../PostsList.tsx/PostsList.tsx"

const UserCard: FC<UserInfoProps> = ({ userInfo }) => {
  return (
    <div className="flex items-center place-content-center border-red-100 border-2  gap-4">
      <Avatar className="hidden h-10 w-10 sm:flex">
        <AvatarImage src={userInfo.imageUrl} alt="Avatar" />
        <AvatarFallback>😃</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-pretty text-clip leading-none">
          {userInfo.name}
        </p>
        <p className="text-sm text-muted-foreground">{userInfo.status}</p>
      </div>
      {/* Sheet modal for profile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline"> o </Button>
        </SheetTrigger>
        <SheetContent className="h-full flex flex-col items-centergap-5">
          <SheetHeader>
            <SheetTitle className="text-center">User Profile</SheetTitle>
            <ProfileCard userInfo={userInfo} />
          </SheetHeader>
          <PostsList />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default UserCard
