import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import styles from './Metrics.module.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Metrics = () => {
  const { metrics, selectedNode, nodes } = useSelector(state => state.dashboard);
  
  const nodeData = selectedNode 
    ? nodes.find(node => node.id === selectedNode)
    : null;

  const chartData = {
    labels: metrics.cpu.map((_, i) => i + 1),
    datasets: [
      {
        label: 'CPU',
        data: metrics.cpu,
        borderColor: '#4e73df',
        backgroundColor: 'rgba(78, 115, 223, 0.05)',
        tension: 0.1
      },
      {
        label: 'Memory',
        data: metrics.memory,
        borderColor: '#1cc88a',
        backgroundColor: 'rgba(28, 200, 138, 0.05)',
        tension: 0.1
      },
      {
        label: 'Disk',
        data: metrics.disk,
        borderColor: '#36b9cc',
        backgroundColor: 'rgba(54, 185, 204, 0.05)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function(value) {
            return `${value}%`;
          }
        }
      }
    }
  };

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>
        {nodeData ? `Метрики узла ${nodeData.name}` : 'Метрики системы'}
      </h3>
      <div className={styles.chart}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Metrics;