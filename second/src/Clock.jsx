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
      list: [],
      darkMode: false
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

  toggleDarkMode = () => {
    this.setState(prevState => ({
      ...prevState,
      darkMode: !prevState.darkMode
    }))
  }

  componentDidMount() {
    fetchApi().then(res => this.setState((preState) => ({
      ...preState,
      lists: res
    })))

    setInterval(this.getTime, 1000)
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    return (
      <div>
        <h2>{this.props.initialName}</h2>
        <h2>{this.state.time.created}</h2>
        <h2>{this.state.seconds.created}</h2>
        <button onClick={this.getTime}>Update Time</button>
        <button onClick={this.toggleDarkMode}>DarkMode</button>
        {this.state.darkMode ? <p>DarkMode: true</p> : <p>DarkMode: false</p>}
      </div>
    )
  }
}
