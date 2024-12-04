import './App.css';
import Booklist from './components/Booklist';
import ProfilePage from './components/ProfilePage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-900 to-black">
        {/* Navbar */}
        <header className="navbar bg-green-700 h-16 flex items-center justify-between px-6 shadow-md">
          <Link
            to="/"
            className="text-xl font-bold text-white hover:text-gray-300"
          >
            Library System
          </Link>
          <Link to="/profile">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              My Profile
            </button>
          </Link>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Booklist />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
