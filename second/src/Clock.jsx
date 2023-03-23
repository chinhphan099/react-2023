import React from "react"
export default class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: {
        created: new Date().toLocaleTimeString()
      },
      seconds: {
        created: new Date().getSeconds()
      }
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
