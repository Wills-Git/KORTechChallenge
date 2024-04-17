// External imports
import type { FC } from "react"

// UI components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx"

// Local components
import ProfileCard from "../ProfileCard/ProfileCard.tsx"

// Type imports
import type { UserInfoProps } from "@/types/types.ts"
import PostsList from "../PostsList/PostsList.tsx"

const UserCard: FC<UserInfoProps> = ({ userInfo }) => {
  const userHasDefaultStatus = userInfo.status === "User hasn't posted a status"

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className=" animate-in flex items-center justify-center p-4 bg-card shadow-sm rounded-lg border-border border-solid border transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg cursor-pointer">
          <Avatar className="flex justify-center items-center h-10 w-10 rounded-full overflow-hidden shadow-sm bg-background">
            <AvatarImage src={userInfo.imageUrl} alt="Avatar" />
            <AvatarFallback>😃</AvatarFallback>
          </Avatar>
          <div className="grid grid-rows-2 max-w-full">
            <p className="text-sm font-semibold text-foreground">
              {userInfo.name}
            </p>
            <p
              className={`text-xs truncate ${userHasDefaultStatus ? "text-muted-foreground" : "text-black"} `}
            >
              {userInfo.status}
            </p>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="h-auto w-full max-w-md p-5 bg-popover rounded-lg shadow-xl text-popover-foreground">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold text-center">
            User Profile
          </SheetTitle>
        </SheetHeader>
        <div className="my-4">
          <ProfileCard userInfo={userInfo} />
        </div>
        <PostsList />
      </SheetContent>
    </Sheet>
  )
}

export default UserCard
