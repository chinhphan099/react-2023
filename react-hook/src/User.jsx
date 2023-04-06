import { useState, useEffect, createContext } from 'react'
import UserProfile from './UserProfile'

const initialAddress = () => {
  return {
    nation: 'Vietnam',
    city: {
      street: '200 Dien Bien Phu, Da Nang',
      house: 'Building'
    }
  }
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
export const UserContext = createContext({
  // Khởi tạo giá trị mặc định, và ko bắt buộc sử dụng 2 thẻ đóng mở của: UserContext.Provider
  address: {
    nation: 'Vietnam',
    city: {
      street: '200 Dien Bien Phu, Da Nang',
      house: 'Building'
    }
  },
  age: 10,
  increaseAge: () => {}
})

export default function User() {
  const [ age, setAge ] = useState(10)
  const [address, setAddress] = useState(initialAddress)
  const changeStreet = () => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      nation: 'USA'
    }))
  }

  const increaseAge = () => {
    setAge((prevAge) => prevAge + 1)
  }

  useEffect(() => {
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
      <UserContext.Provider value={{ address, age, increaseAge }}>
        <UserProfile />
      </UserContext.Provider>
      <button onClick={changeStreet}>Change Street</button>
    </>
  )
}
