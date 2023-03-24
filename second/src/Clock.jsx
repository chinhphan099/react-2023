import React from "react"

const lists = ['a', 'b', 'c']
const fetchApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(lists)
    }, 1000);
  })
}
export default class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: {
        created: new Date().toLocaleTimeString()
      },
      seconds: {
        created: new Date().getSeconds()
      },
      list: []
    }
  }

  getTime = () => {
    const newState = {
      ...this.state, // giữ lại các state không thay đổi
      time: {
        created: new Date().toLocaleTimeString()
      }
    }
    this.setState(newState)
  }

  componentDidMount() {
    fetchApi().then(res => this.setState((preState) => ({
      ...preState,
      lists: res
    })))

    setInterval(this.getTime, 1000)
  }

  render() {
    return (
      <div>
        <h2>{this.props.initialName}</h2>
        <h2>{this.state.time.created}</h2>
        <h2>{this.state.seconds.created}</h2>
        <button onClick={this.getTime}>Update Time</button>
      </div>
    )
  }
}
