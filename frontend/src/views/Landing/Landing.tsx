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
        <UserList />
      </div>
    </>
  )
}

export default Landing
