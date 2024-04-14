import { FC } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import { Button } from "@/components/ui/button.tsx"

const UserCard: FC = () => {
  return (
    <div className="flex items-center place-content-center border-red-100 border-2  gap-4">
      <Avatar className="hidden h-10 w-10 sm:flex">
        <AvatarImage src={user.imageUrl} alt="Avatar" />
        <AvatarFallback>😃</AvatarFallback>
      </Avatar>
      <div className="grid  gap-3">
        <p className="text-sm font-medium text-pretty text-nowrap text-clip leading-none">
          {user.name}
        </p>
        <p className="text-sm text-muted-foreground">status:</p>
      </div>
      <Button variant="outline"> + </Button>
    </div>
  )
}

export default UserCard
