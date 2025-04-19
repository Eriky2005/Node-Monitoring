import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../store/actions';
import StatusBlock from '../StatusBlock/StatusBlock';
import GeneralInfo from '../GeneralInfo/GeneralInfo';
import Groups from '../Groups/Groups';
import Nodes from '../Nodes/Nodes';
import Metrics from '../Metrics/Metrics';
import Interface from '../Interface/Interface';
import Admin from '../Admin/Admin';
import Applications from '../Applications/Applications';
import styles from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const { status, lastUpdated, error } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchData());
    const interval = setInterval(() => dispatch(fetchData()), 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Мониторинг узлов</h1>
        <p className={styles.lastUpdated}>
          Последнее обновление: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Загрузка...'}
        </p>
        {error && <div className={styles.error}>{error}</div>}
        <div className={`${styles.status} ${status}`}></div>
      </header>
      
      <div className={styles.columns}>
        <div className={styles.column}>
          <StatusBlock />
          <GeneralInfo />
          <Groups />
        </div>
        
        <div className={styles.column}>
          <Nodes />
        </div>
        
        <div className={styles.column}>
          <Metrics />
          <Interface />
          <Admin />
          <Applications />
        </div>
      </div>
    </div>
  );
};

export default App;