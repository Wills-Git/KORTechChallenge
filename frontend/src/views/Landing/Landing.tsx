import LoginForm from "@/components/LoginForm/LoginForm.tsx"
import "./layout.css"
import UserList from "@/components/UserList/UserList.tsx"

function Landing() {
  return (
    <>
      <div className="layout">
        <div className="sidebar">
          <LoginForm />
        </div>
        <div className="users flex justify-center align-middle items-center text-center">
          <UserList />
        </div>
      </div>
    </>
  )
}

export default Landing
