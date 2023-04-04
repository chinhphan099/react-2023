import React, { useEffect } from 'react'
import { useState } from 'react'

const initialAddress = () => {
  console.log('initialAddress')
  return {
    nation: 'Vietnam',
    city: {
      street: '200 Dien Bien Phu, Da Nang',
      house: 'Building'
    }
  }
}

export default function User() {
  const [address, setAddress] = useState(initialAddress)
  const changeStreet = () => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      nation: 'USA'
    }))
  }

  const fetchApi = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({
          nation: 'Thai',
          city: {
            street: 'abc',
            house: 'dfg'
          }
        })
      }, 3000);
    })
  }

  useEffect(() => {
    console.log('UseEffect')
    fetchApi().then((res) => {
      setAddress((prevAddress) => {
        const newAddress = { ...prevAddress }
        newAddress.nation = res.nation
        return newAddress
      })
    })

    return () => {
      console.log('Clean up function')
    }
  }, []) // ComponentDidMount => thường dùng để gọi API
  // }) // ComponentDidUpdate

  return (
    <>
      <ul>
        <li>Nation: {address.nation}</li>
        <li>Street: {address.city.street}</li>
        <li>House: {address.city.house}</li>
      </ul>
      <button onClick={changeStreet}>Change Street</button>
    </>
  )
}
