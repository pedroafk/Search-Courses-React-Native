import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import '../styles/App.css';
import '../styles/Topbar.css';
import '../styles/Home.css';
import '../styles/Dashboard.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="topbar">
          <div className="topbar-title">Bora Estudar?</div>
          <nav className="topbar-nav">
            <Link to="/" className="topbar-link">Início</Link>
            <Link to="/dashboard" className="topbar-link">Dashboard</Link>
          </nav>
        </div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;