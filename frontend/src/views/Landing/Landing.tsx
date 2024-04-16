import AuthForm from "@/components/LoginForm/LoginForm.tsx"
import "./layout.css"
import UserList from "@/components/UserList/UserList.tsx"
import { useAppSelector } from "@/redux/hooks.ts"
import CurrUserDashboard from "@/components/CurrUserDashboard/CurrUserDashboard.tsx"

function Landing() {
  const isLoggedIn = useAppSelector(state => state.currUser.isLoggedIn)
  return (
    <>
      <div className="layout">
        <div className="sidebar">
          {isLoggedIn ? <CurrUserDashboard /> : <AuthForm />}
        </div>
        <div className="users flex justify-center align-middle items-center text-center">
          <UserList />
        </div>
      </div>
    </>
  )
}

export default Landing
