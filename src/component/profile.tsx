import React from 'react'
import { useAppSelector } from '../store/store';


const Profile:React.FC = () => {
    const email = useAppSelector(state=>state.auth.email)
    const password = useAppSelector(state=>state.auth.password)
  return (
    <div>
      This is profile component
      <h1>Your email is: {email}</h1>
      <h1>Your password is: {password}</h1>
    </div>
  )
}

export default Profile
