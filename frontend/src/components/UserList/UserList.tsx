// External imports
import type { FC } from "react"
import { useInView } from "react-intersection-observer"

// Local imports from Redux Toolkit
import { useGetAllUsersQuery } from "@/redux/usersApiSlice.ts"

// UI components
import { ScrollArea } from "../ui/scroll-area.tsx"
import { Skeleton } from "../ui/skeleton.tsx"

// Local components
import UserCard from "../UserCard/UserCard.tsx"

// Hooks
import useReduxErrorToast from "@/hooks/useReduxErrorToast.tsx"

// Type imports
import type { UserInfoType } from "@/types/types.ts"

const UserList: FC = () => {
  const { data, error, isError } = useGetAllUsersQuery()
  useReduxErrorToast(error, isError)

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary mt-5">
        Friend Connection
      </h1>
      <ScrollArea className="w-full h-[calc(90vh-20px)] scroll-gradient overflow-y-auto p-7 mt-4 mb-2 mr-5 rounded-md border scroll-smooth">
        <div className="grid grid-cols-2 gap-2 w-full">
          {data &&
            data.map((user: UserInfoType) => (
              <UserLazyLoad key={user.PK} userInfo={user} />
            ))}
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
