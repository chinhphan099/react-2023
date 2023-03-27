import React, { Component } from 'react'
class Button extends Component {
  handleClick = (event) => {
    console.log(event)
  }
  render() {
    return (
      <button className="btn" onClick={this.handleClick}>Click</button>
    )
  }
}

  // YellowButton extends component Button, kế thử handleClick
class YellowButton extends Button {
  render() {
    return (
      <button className="btn yellow-button" onClick={this.handleClick}>Click</button>
    )
  }
}

export default class Inheritance extends Component {
  render() {
    return (
      <>Inheritance <Button /> <YellowButton /></>
    )
  }
}
