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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx"
import ProfileCard from "../ProfileCard/ProfileCard.tsx"

const UserCard: FC<UserInfoProps> = ({ userInfo }) => {
  return (
    <div className="flex items-center place-content-center border-red-100 border-2  gap-4">
      <Avatar className="hidden h-10 w-10 sm:flex">
        <AvatarImage src={userInfo.imageUrl} alt="Avatar" />
        <AvatarFallback>😃</AvatarFallback>
      </Avatar>
      <div className="grid  gap-3">
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
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>User Profile</SheetTitle>
            <ProfileCard userInfo={userInfo} />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default UserCard
