import logo from './logo.svg'
import './App.css'
import Welcome from './welcome'
import Comment from './Comment'
import Clock from './Clock'
import { useState } from 'react'
import BareInput from './BareInput'
import Layout from './Layout'

const comment = {
  author: {
    firstName: 'Chinh',
    avtSrc: 'avt source.'
  }
}
function App() {
  const [clockName, setName] = useState('Casio')
  const [visible, setVisible] = useState(true)

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setName('Apple')}>Change Clock Name</button>
        <button onClick={() => setVisible(!visible)}>Toogle Show/Hide Clock</button>
        {visible && <Clock initialName={clockName} />}
        <Welcome name="Chinh Phan" />
        <Comment author={comment.author} age="20" />
        <img src={logo} className="App-logo" alt="logo" />
        <Layout>
          <h2>Layout</h2>
          <BareInput type="text" placeholder="place holder" autoFocus className="custom-input" onChange={() => {}} />
        </Layout>
      </header>
    </div>
  );
}

export default App;
