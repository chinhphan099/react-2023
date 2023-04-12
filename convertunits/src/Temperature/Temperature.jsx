import React, { Component } from 'react'
import Boiler from './Boiler'
import TemperatureInput from './TemperatureInput'

const SCALE_NAMES = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

const tinhDoC = (fahrenheit) => {
  return (fahrenheit - 32) / 1.8
}

const tinhDoF = (celsius) => {
  return celsius * 1.8 + 32
}

const convert = (temperature, convertFunc) => {
  if (temperature === '') return ''
  let output = convertFunc(Number(temperature))
  output = Math.round(output * 1000) / 1000
  return String(output)
}

export class Temperature extends Component {
  constructor(props) {
    super(props)

    this.state = {
      temperature: '',
      temSymbol: 'c'
    }
  }
  handleChange = (temSymbol) => (value) => {
    this.setState({
      temperature: value,
      temSymbol: temSymbol
    })
  }
  render() {
    const { temperature, temSymbol } = this.state
    const celsius = temSymbol === SCALE_NAMES.f ? convert(temperature, tinhDoC) : temperature
    const fahrenheit = temSymbol === SCALE_NAMES.c ? convert(temperature, tinhDoF) : temperature
    return (
      <>
        <div className='row'>
          <div className='col'>
            <TemperatureInput title='Độ C' temperature={celsius} onTemperatureChange={this.handleChange(SCALE_NAMES.c)} />
          </div>
          <div className='col'>
            <TemperatureInput title='Độ F' temperature={fahrenheit} onTemperatureChange={this.handleChange(SCALE_NAMES.f)} />
          </div>
        </div>
        {/* <Boiler celsius={celsius} /> */}
      </>
    )
  }
}

export default Temperature
