import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClickCounts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v2/post/click/counts');
        
        const labels = [];
        const counts = [];
        
        response.data.forEach(item => {
          const key = item['title'];
          const count = item['count'];
          
          const shortLabel = key.split(' ').slice(0, 4).join(' ');
  
          labels.push(shortLabel);
          counts.push(count);
        });

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Cliques',
              data: counts,
              backgroundColor: 'rgba(255, 71, 87, 0.8)',
              borderColor: 'rgba(255, 71, 87, 1)',
              borderWidth: 1,
            },
          ],
        });
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard: ' + err.message);
        console.error('Erro ao buscar dados de cliques:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClickCounts();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e0e0e0',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Estatísticas de Cliques por Post',
        color: '#ffffff',
        font: {
          size: 18
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#e0e0e0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#e0e0e0',
        },
        grid: {
          display: false
        }
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