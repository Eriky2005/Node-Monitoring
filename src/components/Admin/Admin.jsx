import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Admin.module.scss';

const Admin = () => {
  const { selectedNode, nodes } = useSelector(state => state.dashboard);
  const node = selectedNode ? nodes.find(n => n.id === selectedNode) : null;

  if (!node) return null;

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Администратор</h3>
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>Имя:</span>
          <span className={styles.value}>Админ {node.id}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>admin{node.id}@example.com</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Телефон:</span>
          <span className={styles.value}>+7 (900) 123-45-{node.id}</span>
        </div>
      </div>
    </div>
  );
};

export default Admin;