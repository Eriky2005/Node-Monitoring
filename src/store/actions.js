export const fetchDataStart = () => ({ type: 'FETCH_DATA_START' });
export const fetchDataSuccess = (data) => ({ type: 'FETCH_DATA_SUCCESS', payload: data });
export const fetchDataError = (error) => ({ type: 'FETCH_DATA_ERROR', payload: error });
export const selectGroup = (groupId) => ({ type: 'SELECT_GROUP', payload: groupId });
export const selectNode = (nodeId) => ({ type: 'SELECT_NODE', payload: nodeId });
const API_BASE = 'http://127.0.0.1:23456/api';

export const fetchData = () => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const [metricsRes, groupsRes] = await Promise.all([
      fetch(`${API_BASE}/metrics`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }),
      fetch(`${API_BASE}/groups`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    ]);

    const metrics = await metricsRes.json();
    const groups = await groupsRes.json();

    const nodes = metrics.nodes.map(node => ({
      id: node.id,
      name: node.name,
      groupIds: node.groups || [],
      cpu: node.cpu_usage || 0,
      memory: node.memory_usage || 0,
      disk: node.disk_usage || 0,
      status: getNodeStatus(node)
    }));

    dispatch(fetchDataSuccess({
      nodes,
      groups,
      metrics: {
        cpu: metrics.cpu_history || [],
        memory: metrics.memory_history || [],
        disk: metrics.disk_history || []
      },
      status: getSystemStatus(nodes)
    }));
  } catch (error) {
    dispatch(fetchDataError(error.message));
  }
};

function getNodeStatus(node) {
  if (node.cpu_usage > 95 || node.memory_usage > 95 || node.disk_usage > 95) return 'error';
  if (node.cpu_usage > 85 || node.memory_usage > 85 || node.disk_usage > 85) return 'warning';
  return 'ok';
}

function getSystemStatus(nodes) {
  return nodes.reduce((status, node) => {
    if (node.status === 'error') return 'error';
    if (node.status === 'warning' && status !== 'error') return 'warning';
    return status;
  }, 'ok');
}