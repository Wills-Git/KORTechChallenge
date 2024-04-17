import type { FC } from "react"
import UserCard from "../UserCard/UserCard.tsx"
import { useGetAllUsersQuery } from "@/redux/usersApiSlice.ts"
import useReduxErrorToast from "@/hooks/useReduxErrorToast.tsx"
import { ScrollArea } from "../ui/scroll-area.tsx"
import { useInView } from "react-intersection-observer"
import type { UserInfoType } from "@/types/types.ts"
import { Skeleton } from "../ui/skeleton.tsx"

const UserList: FC = () => {
  const { data, error, isError } = useGetAllUsersQuery()
  useReduxErrorToast(error, isError)

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary mt-5">
        Friend Connection
      </h1>
      <ScrollArea className="w-full h-[calc(90vh-20px)] scroll-gradient overflow-y-auto p-7 mt-4 mb-2 mr-5 rounded-md border scroll-smooth">
        <div className="grid auto-cols-auto gap-2 w-full">
          {data &&
            data.map(user => <UserLazyLoad key={user.PK} userInfo={user} />)}
        </div>
      </ScrollArea>
    </div>
  )
}

const UserLazyLoad: FC<{ userInfo: UserInfoType }> = ({ userInfo }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px", // Load before scrolling into view
  })

  return (
    <div ref={ref}>
      {inView ? (
        <UserCard userInfo={userInfo} />
      ) : (
        <Skeleton className="rounded-lg w-full h-20 fade-out-30 duration-800 ease-in"></Skeleton>
      )}
    </div>
  )
}

export default UserList
