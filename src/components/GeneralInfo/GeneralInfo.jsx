import React from 'react';
import { useSelector } from 'react-redux';
import styles from './GeneralInfo.module.scss';

const GeneralInfo = () => {
  const { nodes } = useSelector(state => state.dashboard);
  
  const totalNodes = nodes.length;
  const warningNodes = nodes.filter(n => n.status === 'warning').length;
  const errorNodes = nodes.filter(n => n.status === 'error').length;

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Общая информация</h3>
      <div className={styles.content}>
        <div className={styles.item}>
          <span className={styles.label}>Всего узлов:</span>
          <span className={styles.value}>{totalNodes}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>С предупреждением:</span>
          <span className={`${styles.value} ${styles.warning}`}>{warningNodes}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>С ошибкой:</span>
          <span className={`${styles.value} ${styles.error}`}>{errorNodes}</span>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;