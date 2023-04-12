import React, { useState } from 'react'
import Input from '../Input'

const LengthUnits = {
  m: 'Met',
  f: 'Feet'
}
const toFeet = (value) => {
  return value * 3.28084;
}
const toMet = (value) => {
  return value / 3.28084;
}
const convert = (value, fnc) => {
  if (!value) return ''
  let convertedValue = fnc(Number(value));
  convertedValue = Math.round(convertedValue * 100000) / 100000
  return convertedValue
}
export default function Length() {
  const [metValue, setMetValue] = useState('')
  const [feetValue, setFeetValue] = useState('')

  const handleChange = (unit) => (value) => {
    switch (unit) {
      case LengthUnits.m:
        setMetValue(value)
        setFeetValue(convert(value, toFeet))
        break
      default:
        setFeetValue(value)
        setMetValue(convert(value, toMet))
    }
  }

  return (
    <>
      <div className='row'>
        <div className='col'>
          <Input title={LengthUnits.m} value={metValue} handleChange={handleChange(LengthUnits.m)} />
        </div>
        <div className='col'>
          <Input title={LengthUnits.f} value={feetValue} handleChange={handleChange(LengthUnits.f)} />
        </div>
      </div>
    </>
  )
}
