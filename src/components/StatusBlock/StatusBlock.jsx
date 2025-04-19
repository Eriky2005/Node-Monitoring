import React from 'react';
import { useSelector } from 'react-redux';
import styles from './StatusBlock.module.scss';

const StatusBlock = () => {
  const { status } = useSelector(state => state.dashboard);
  
  const statusMap = {
    ok: 'Норма',
    warning: 'Предупреждение',
    error: 'Ошибка',
    loading: 'Загрузка...'
  };

  return (
    <div className={`${styles.block} ${styles[status]}`}>
      <h3 className={styles.title}>Статус системы</h3>
      <div className={styles.content}>
        <div className={`${styles.indicator} ${styles[status]}`}></div>
        <span className={styles.text}>{statusMap[status]}</span>
      </div>
    </div>
  );
};

export default StatusBlock;