import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNode } from '../../store/actions';
import NodeItem from '../NodeItem/NodeItem';
import styles from './Nodes.module.scss';

const Nodes = () => {
  const dispatch = useDispatch();
  const { nodes, selectedGroup, selectedNode } = useSelector(state => state.dashboard);
  
  const filteredNodes = selectedGroup 
    ? nodes.filter(node => node.groupIds.includes(selectedGroup))
    : nodes;

  const handleNodeClick = (nodeId) => {
    dispatch(selectNode(nodeId));
  };

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Узлы</h3>
      <div className={styles.list}>
        {filteredNodes.length > 0 ? (
          filteredNodes.map(node => (
            <NodeItem 
              key={node.id}
              node={node}
              isSelected={selectedNode === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))
        ) : (
          <div className={styles.empty}>Нет узлов для отображения</div>
        )}
      </div>
    </div>
  );
};

export default Nodes;