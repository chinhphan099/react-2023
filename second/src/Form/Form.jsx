import React, { Component } from 'react'

export class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      address: '',
      number: '2',
      marriage: false
    }
  }
  handleChange = (event) => {
    console.log(event)
    const { target } = event
    const { name } = target
    this.setState({
      [name]: target.type !== 'checkbox' ? target.value : target.checked
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <h2>FORM</h2>
        <form>
          <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
          <textarea value={this.state.address} name="address" onChange={this.handleChange} />
          <select value={this.state.number} name="number" onChange={this.handleChange}>
            <option value="1">Mot</option>
            <option value="2">Hai</option>
          </select>
          <input type="checkbox" name="marriage" checked={this.state.marriage} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Form
