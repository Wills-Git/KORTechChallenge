import type { FC } from "react"
import UserCard from "../UserCard/UserCard.tsx"
import { useGetAllUsersQuery } from "@/redux/usersApiSlice.ts"

const UserList: FC = () => {
  const { data, error, isLoading } = useGetAllUsersQuery()

  return (
    <>
      <div className="users grid grid-cols-3 gap-2">
        {data &&
          data.map(user => (
            <div key={user.PK}>
              <UserCard userInfo={user} />
            </div>
          ))}
      </div>
    </>
  )
}
export default UserList
