import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGroup } from '../../store/actions';
import styles from './Groups.module.scss';

const Groups = () => {
  const dispatch = useDispatch();
  const { groups, selectedGroup } = useSelector(state => state.dashboard);

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Группы</h3>
      <div className={styles.list}>
        <button
          className={`${styles.item} ${!selectedGroup ? styles.active : ''}`}
          onClick={() => dispatch(selectGroup(null))}
        >
          Все группы
        </button>
        {groups.map(group => (
          <button
            key={group.id}
            className={`${styles.item} ${selectedGroup === group.id ? styles.active : ''}`}
            onClick={() => dispatch(selectGroup(group.id))}
          >
            {group.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Groups;