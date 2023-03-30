import React, { Component } from 'react'

export class SearchBox extends Component {
  render() {
    const { handleChange } = this.props
    return (
      <React.Fragment>
        <input type="text" name="searchBox" onChange={handleChange} />
        <p>
          <input type="checkbox" name="inStock" onChange={handleChange} />
          Only show products in stock
        </p>
      </React.Fragment>
    )
  }
}

export default SearchBox
