import React from 'react';
import styles from './NodeItem.module.scss';

const NodeItem = ({ node, isSelected, onClick }) => {
  const getMetricClass = (value) => {
    if (value > 95) return styles.error;
    if (value > 85) return styles.warning;
    return '';
  };

  return (
    <div 
      className={`${styles.item} ${isSelected ? styles.selected : ''} ${styles[node.status]}`}
      onClick={onClick}
    >
      <div className={styles.header}>
        <span className={styles.name}>{node.name}</span>
        <span className={`${styles.status} ${styles[node.status]}`}></span>
      </div>
      
      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.label}>CPU:</span>
          <span className={`${styles.value} ${getMetricClass(node.cpu)}`}>{node.cpu}%</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Memory:</span>
          <span className={`${styles.value} ${getMetricClass(node.memory)}`}>{node.memory}%</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.label}>Disk:</span>
          <span className={`${styles.value} ${getMetricClass(node.disk)}`}>{node.disk}%</span>
        </div>
      </div>
    </div>
  );
};

export default NodeItem;