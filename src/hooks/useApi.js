import { useReducer, useEffect } from 'react';
import { API_BASE } from '../styles/theme';

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { data: state.data, loading: true, error: null };
    case 'success':
      return { data: action.data, loading: false, error: null };
    case 'error':
      return { data: null, loading: false, error: action.error };
    default:
      return state;
  }
}

export function useApi(endpoint) {
  const [state, dispatch] = useReducer(reducer, { data: null, loading: true, error: null });

  useEffect(() => {
    if (!endpoint) return;

    let cancelled = false;
    dispatch({ type: 'loading' });

    fetch(`${API_BASE}${endpoint}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        if (!cancelled) dispatch({ type: 'success', data: json });
      })
      .catch(err => {
        if (!cancelled) dispatch({ type: 'error', error: err.message });
      });

    return () => { cancelled = true; };
  }, [endpoint]);

  return state;
}
