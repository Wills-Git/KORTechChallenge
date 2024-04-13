import React from "react"

import { useParams } from "react-router-dom"

function UserProfile() {
    //get userid from params to query for users information in db
  const { userid } = useParams()
  return <div>user is {userid}</div>
}

export default UserProfile
