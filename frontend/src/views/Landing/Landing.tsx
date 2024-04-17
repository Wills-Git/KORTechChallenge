import { AuthForm }from "@/components/AuthForm/AuthForm.tsx"
import "./layout.css"
import UserList from "@/components/UserList/UserList.tsx"
import { useAppSelector } from "@/redux/hooks.ts"
import CurrUserDashboard from "@/components/CurrUserDashboard/CurrUserDashboard.tsx"
import type { FC } from "react"

const Landing: FC = () => {
  const isLoggedIn = useAppSelector(state => state.currUser.isLoggedIn)
  return (
    <>
      <div className="layout flex justify-center items-center gap-4 row h-screen w-full">
        <div className="sidebar flex h-full w-[30%] pr-7 flex-col justify-center align-middle items-center text-center">
          {isLoggedIn ? <CurrUserDashboard /> : <AuthForm />}
        </div>
        <div className="users flex justify-center w-[60%] align-middle items-center text-center">
          <UserList />
        </div>
      </div>
    </>
  )
}

export default Landing
