import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Boiler extends Component {
  render() {
    let text = ''
    if (this.props.celsius !== '') {
      text = this.props.celsius >= 100 ? 'Nước đã sôi' : 'Nước chưa sôi'
    }

    return (
      <fieldset>
        <legend>Thông báo</legend>
        { text ? text : 'Không có thông báo' }
      </fieldset>
    )
  }
}

Boiler.propTypes = {
  celsius: PropTypes.string
}

export default Boiler
