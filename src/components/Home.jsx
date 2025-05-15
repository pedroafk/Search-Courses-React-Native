import { useState, useEffect } from 'react';
import { fetchPosts, registerClick } from '../services/postService';
import PostCard from './PostCard';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const loadPosts = async (searchQuery = '') => {
        setLoading(true);
        try {
            const data = await fetchPosts(searchQuery);
            setPosts(data);
            setError('');
        } catch (error) {
            setError('Erro ao carregar posts: ' + error.message);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleClick = async (postId, e) => {
        if (e.button === 0 || e.button === 1) {
            try {
                await registerClick(postId);
                console.log(`Click registrado para o post ${postId}`);
            } catch (error) {
                console.error('Erro ao registrar click:', error);
            }
        }
    };

    const handleSearch = () => {
        loadPosts(searchTerm);
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
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Pesquisar
                </button>
            </div>

            <div className='posts-list'>
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onClick={handleClick}
                    />
                ))}
            </div>
        </div>  
    );
}

export default Home;