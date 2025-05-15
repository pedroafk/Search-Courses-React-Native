import axios from 'axios';

export async function fetchPosts(searchQuery = '') {
    try {
        const url = searchQuery 
        ? `http://localhost:8080/api/v2/post?content=${encodeURIComponent(searchQuery)}`
        : 'http://localhost:8080/api/v2/post';
        
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        throw new Error('Erro ao carregar posts: ' + error.message);
    }
}

export async function registerClick(postId) {
    try {
        await axios.get(`http://localhost:8080/api/v2/post/${postId}/click`);
        console.log(`Click registrado para o post ${postId}`);
    } catch (error) {
        console.error('Erro ao registrar click:', error);
        throw new Error('Erro ao registrar click: ' + error.message);
    }
}