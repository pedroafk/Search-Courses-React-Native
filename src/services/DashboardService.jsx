import axios from 'axios';

export async function fetchClickCounts() {
    try {
        const response = await axios.get('http://localhost:8080/api/v2/post/click/counts');
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        throw new Error('Erro ao carregar dados do dashboard: ' + error.message);
    }
};