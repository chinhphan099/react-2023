import logo from './logo.svg'
import './App.css'
import Welcome from './welcome'
import Comment from './Comment'
import Clock from './Clock'
import { useState } from 'react'
import BareInput from './BareInput'
import Layout from './Layout'
import BareButton from './BareButton'
import LoginControl from './LoginControl'
import CorrectlyState from './CorrectlyState'
import ProductList from './ProductList/ProductList'
import Form from './Form/Form'
import UncontrolledComponent from './Form/UncontrolledComponent'
import Inheritance from './CompositionInheritance/Inheritance'
import Composition from './CompositionInheritance/Composition'

const comment = {
  author: {
    firstName: 'Chinh',
    avtSrc: 'avt source.'
  }
}
function App() {
  const [clockName, setName] = useState('Casio')
  const [visible, setVisible] = useState(false)

  return (
    <div className="App">
      <Inheritance />
      <Composition />
      <UncontrolledComponent />
      <Form />
      <ProductList />
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
          <BareButton />
        </Layout>
        <LoginControl isHide={false} />
        <CorrectlyState />
      </header>
    </div>
  );
}

export default App;
