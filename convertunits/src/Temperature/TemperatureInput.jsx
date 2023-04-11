import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TemperatureInput extends Component {
  handleChange = (event) => {
    this.props.onTemperatureChange(event.target.value)
  }
  render() {
    return (
      <div>
        <fieldset>
          <legend>{this.props.title}</legend>
          <input type="tel" value={this.props.temperature} onChange={this.handleChange} />
        </fieldset>
      </div>
    )
  }
}

TemperatureInput.propTypes = {
  title: PropTypes.string,
  temperature: PropTypes.string,
  onTemperatureChange: PropTypes.func
}

export default TemperatureInput
