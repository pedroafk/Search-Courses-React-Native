import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { fetchClickCounts } from '../services/DashboardService';
import { buildChartData } from '../utils/BuildChartUtil';
import '../styles/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchClickCounts();
        setChartData(buildChartData(data));
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard: ' + err.message);
        console.error('Erro ao buscar dados de cliques:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e0e0e0',
          font: { size: 14 }
        }
      },
      title: {
        display: true,
        text: 'Estatísticas de Cliques por Post',
        color: '#ffffff',
        font: { size: 18 }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#e0e0e0' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: '#e0e0e0' },
        grid: { display: false }
      }
    }
  };

  if (loading) return <div className="loading">Carregando dados do dashboard...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!chartData) return <div className="loading">Nenhum dado disponível</div>;

  return (
    <div className="dashboard-container">
      <div className="chart-wrapper">
        <Bar 
          data={chartData} 
          options={options} 
          height={400}
        />
      </div>
    </div>
  );
}