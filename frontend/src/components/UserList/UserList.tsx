import { FC } from "react"
import UserCard from "../UserCard/UserCard.tsx"
import { useGetAllUsersQuery } from "@/redux/usersApiSlice.ts"
import useReduxErrorToast from "@/hooks/useReduxErrorToast.tsx"
import { ScrollArea } from "../ui/scroll-area.tsx"
import { useInView } from "react-intersection-observer"
import { UserInfoType } from "@/types/types.ts"

const UserList: FC = () => {
  const { data, error, isLoading, isError } = useGetAllUsersQuery()
  useReduxErrorToast(error, isError)

  return (
    <>
      <ScrollArea
        className="w-full"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="grid grid-cols-3 gap-2 w-full">
          {data &&
            data.map(user => <UserLazyLoad key={user.PK} userInfo={user} />)}
        </div>
      </ScrollArea>
    </>
  )
}

const UserLazyLoad: FC<{ userInfo: UserInfoType }> = ({ userInfo }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px", // Load before scrolling into view
  })

  return (
    <div ref={ref}>
      {inView ? <UserCard userInfo={userInfo} /> : <div>Loading...</div>}
    </div>
  )
}

export default UserList
