import { combineReducers } from 'redux';

const initialState = {
  nodes: [],
  groups: [],
  selectedGroup: null,
  selectedNode: null,
  metrics: {
    cpu: [],
    memory: [],
    disk: []
  },
  status: 'loading',
  lastUpdated: null,
  error: null
};

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DATA_START':
      return { ...state, status: 'loading' };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        nodes: action.payload.nodes,
        groups: action.payload.groups,
        metrics: action.payload.metrics,
        status: action.payload.status,
        lastUpdated: new Date().toISOString(),
        error: null
      };
    case 'FETCH_DATA_ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'SELECT_GROUP':
      return { ...state, selectedGroup: action.payload, selectedNode: null };
    case 'SELECT_NODE':
      return { ...state, selectedNode: action.payload };
    default:
      return state;
  }
}

export default combineReducers({
  dashboard: dashboardReducer
});