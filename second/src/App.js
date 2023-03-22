import logo from './logo.svg';
import './App.css';
import Welcome from './welcome';
import Comment from './Comment';

const comment = {
  author: {
    firstName: 'Chinh',
    avtSrc: 'avt source'
  }
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Welcome name="Chinh Phan" />
        <Comment author={comment.author} age="20" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
