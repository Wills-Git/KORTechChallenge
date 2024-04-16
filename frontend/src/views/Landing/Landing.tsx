import AuthForm from "@/components/AuthForm/AuthForm.tsx"
import "./layout.css"
import UserList from "@/components/UserList/UserList.tsx"
import { useAppSelector } from "@/redux/hooks.ts"
import CurrUserDashboard from "@/components/CurrUserDashboard/CurrUserDashboard.tsx"

function Landing() {
  const isLoggedIn = useAppSelector(state => state.currUser.isLoggedIn)
  return (
    <>
      <div className="layout flex row h-screen w-full">
        <div className="sidebar flex h-full w-[30%] flex-col p-3 justify-center align-middle items-center text-center">
          {isLoggedIn ? <CurrUserDashboard /> : <AuthForm />}
        </div>
        <div className="users flex justify-center w-[70%] align-middle items-center text-center">
          <UserList />
        </div>
      </div>
    </>
  )
}

export default Landing
