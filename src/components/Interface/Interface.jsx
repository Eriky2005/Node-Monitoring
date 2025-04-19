import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Interface.module.scss';

const Interface = () => {
  const { selectedNode, nodes } = useSelector(state => state.dashboard);
  const node = selectedNode ? nodes.find(n => n.id === selectedNode) : null;

  if (!node) return null;

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Интерфейс</h3>
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>Статус:</span>
          <span className={styles.value}>Активен</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>IP-адрес:</span>
          <span className={styles.value}>192.168.1.{node.id}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Скорость:</span>
          <span className={styles.value}>1 Гбит/с</span>
        </div>
      </div>
    </div>
  );
};

export default Interface;