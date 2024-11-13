import logo from './logo.svg';
import './App.css';
import Booklist from './components/Booklist';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Library System</h1>
      </header>
      <main>
        <Booklist />
      </main>
    </div>
  );
}

export default App;
