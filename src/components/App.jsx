import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import '../styles/App.css';
import '../styles/Home.css';
import '../styles/Dashboard.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async (searchQuery = '') => {
    setLoading(true);
    try {
      const url = searchQuery 
        ? `http://localhost:8080/api/v2/post?content=${encodeURIComponent(searchQuery)}`
        : 'http://localhost:8080/api/v2/post';
      
      const response = await axios.get(url);
      setPosts(response.data);
      setError('');
    } catch (error) {
      setError('Erro ao carregar posts: ' + error.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleClick = async (postId, e) => {
    if (e.button === 0 || e.button === 1) {
      try {
        await axios.get(`http://localhost:8080/api/v2/post/${postId}/click`);
        console.log(`Click registrado para o post ${postId}`);
      } catch (error) {
        console.error('Erro ao registrar click:', error);
      }
    }
  };

  const handleSearch = () => {
    fetchPosts(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="content">
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button 
          onClick={handleSearch}
          className="search-button"
        >
          Pesquisar
        </button>
      </div>
      
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="site-name">{post.site.name}</span>
              <span className="post-date">em {formatDate(post.pubDate)}</span>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <a 
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="post-link"
              onClick={(e) => handleClick(post.id, e)}
              onAuxClick={(e) => handleClick(post.id, e)}
              onContextMenu={(e) => e.preventDefault()}
            >
              Assistir
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

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