import React, { Component, createRef } from 'react'
// ! Không truyền value vào input
// ! input[type="file"] không sử dụng attribute value
// ! input[type="text"] có sử dụng attribute value, ko được gắn giá trị là undefined hoặc null
export class UncontrolledComponent extends Component {
  constructor(props) {
    super(props)
    this.fileInput = createRef()
    this.state = {
      selectedFile: null
    }
  }
  handleFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('avatar', this.state.selectedFile, this.state.selectedFile.name)

    // axios.post('/api/uploadFile', formData)

    console.log(this.state)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" name="avatar" ref={this.fileInput} onChange={this.handleFileChange} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default UncontrolledComponent
