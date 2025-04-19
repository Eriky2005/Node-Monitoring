import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Applications.module.scss';

const Applications = () => {
  const { selectedNode, nodes } = useSelector(state => state.dashboard);
  const node = selectedNode ? nodes.find(n => n.id === selectedNode) : null;

  if (!node) return null;

  const apps = [
    { name: 'Веб-сервер', version: '2.4.41', status: 'running' },
    { name: 'База данных', version: '10.5.8', status: 'running' },
    { name: 'Кэш-сервер', version: '6.2.6', status: 'stopped' }
  ];

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Приложения</h3>
      <div className={styles.list}>
        {apps.map((app, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.info}>
              <span className={styles.name}>{app.name}</span>
              <span className={styles.version}>v{app.version}</span>
            </div>
            <span className={`${styles.status} ${styles[app.status]}`}>
              {app.status === 'running' ? 'Запущен' : 'Остановлен'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;