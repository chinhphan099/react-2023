import React, { Component } from 'react'

//! Nên sử dụng Composition hơn là Inheritance

class Button extends Component {
  handleClick = (event) => {
    console.log(event.target)
  }
  render() {
    const { className = '', children } = this.props
    return (
      <button className={`btn ${className}`} onClick={this.handleClick}>{children} Button</button>
    )
  }
}

class Layout extends Component {
  render() {
    const { left, right } = this.props
    return (
      <>
        {left}
        {right}
      </>
    )
  }
}

export default class Composition extends Component {
  render() {
    return (
      <>
        Composition
        <Button />
        <Button className="yellow">
          Yellow
        </Button>
        <Layout left={<Button className="left">Left</Button>} right={<Button className="right">Right</Button>} />
      </>
    )
  }
}
