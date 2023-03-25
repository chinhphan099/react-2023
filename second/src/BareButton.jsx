import React from "react"

export default class BareButton extends React.Component {
  handleClick(event, value) {
    console.log(event)
    console.log(value)
  }
  render() {
    return (
      <div>
        <button onClick={(event) => this.handleClick(event, 'Add')}>Add</button>
        <button onClick={this.handleClick.bind(this, 'Edit')}>Edit</button>
        <button onClick={this.handleClick.bind(this, 'Delete')}>Delete</button>
      </div>
    )
  }
}
