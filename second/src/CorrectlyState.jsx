import React, { Component } from 'react';
const fetchComment = () =>
  new Promise((resolve) => {
    return resolve(['A', 'B', 'C'])
  })

export default class CorrectlyState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0,
      comments: []
    }
  }

  componentDidMount() {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }))

    this.setState((prevState) => ({
      count: prevState.count + 1
    }))

    fetchComment().then(res => {
      /* this.setState(prevState => ({
        ...prevState, // Không cần thêm vào, state tự động merge -> chỉ sử dụng với class component
        comments: res
      })) */
      // Nên có thể viết ngắn gọn
      this.setState({ comments: res })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        Count {this.state.count}
      </div>
    );
  }
}
