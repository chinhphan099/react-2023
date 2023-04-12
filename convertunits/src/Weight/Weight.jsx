import { useState } from 'react'
import Input from '../Input'

const WeightUnits = {
  kg: 'Kg',
  lb: 'Pound'
}
const toPound = (value) => {
  return value * 2.20462;
}
const toKg = (value) => {
  return value / 2.20462;
}
const convert = (value, fnc) => {
  if (!value) return ''
  let convertedValue = fnc(Number(value));
  convertedValue = Math.round(convertedValue * 100000) / 100000
  return convertedValue
}
export default function Weight() {
  const [kgValue, setMetValue] = useState('')
  const [poundValue, setFeetValue] = useState('')

  const handleChange = (unit) => (value) => {
    switch (unit) {
      case WeightUnits.kg:
        setMetValue(value)
        setFeetValue(convert(value, toPound))
        break
      default:
        setFeetValue(value)
        setMetValue(convert(value, toKg))
    }
  }

  return (
    <>
      <div className='row'>
        <div className='col'>
          <Input title={WeightUnits.kg} value={kgValue} handleChange={handleChange(WeightUnits.kg)} />
        </div>
        <div className='col'>
          <Input title={WeightUnits.lb} value={poundValue} handleChange={handleChange(WeightUnits.lb)} />
        </div>
      </div>
    </>
  )
}
