import React, { useContext } from 'react'
import Profile from './Profile'
import { UserContext } from './User'

export default function UserProfile() {
  const { increaseAge } = useContext(UserContext)
  return (
    <>
      <Profile />
      <button onClick={increaseAge}>Increase Age</button>
    </>
  )
}
