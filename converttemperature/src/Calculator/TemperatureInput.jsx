import React, { Component } from 'react'

export class TemperatureInput extends Component {
  handleChange = (event) => {
    this.props.onTemperatureChange(event.target.value)
  }
  render() {
    return (
      <div>
        <fieldset>
          <legend>Độ {this.props.title}</legend>
          <input type="number" value={this.props.temperature} onChange={this.handleChange} />
        </fieldset>
      </div>
    )
  }
}

export default TemperatureInput
