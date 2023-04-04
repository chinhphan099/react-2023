import React, { useContext } from 'react'
import { UserContext } from './User'

export default function Profile() {
  const { age, address } = useContext(UserContext)
  return (
    <>
      <ul>
        <li>{age}</li>
        <li>Nation: {address.nation}</li>
        <li>Street: {address.city.street}</li>
        <li>House: {address.city.house}</li>
      </ul>
    </>
  )
}
