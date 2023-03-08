import { useEffect, useReducer, useContext } from 'react';
import { CacheContext } from '../CacheContext';

const initialState = { loading: false, data: null, error: null };

const fetchReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD':
      return { ...state, loading: true, data: null, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, data: payload, error: null };
    case 'FAILURE':
      return { ...state, loading: false, data: null, error: payload };
    default:
      return state;
  }
};

export const useFetchTimeoutGetPokemon = (fetchResource, param, timeout) => {
  const cache = useContext(CacheContext);
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (cache.state[param]) {
        dispatch({ type: 'SUCCESS', payload: cache.state[param] });
        return;
      }
      dispatch({ type: 'LOAD' });
      try {
        const resource = await fetchResource(param);
        dispatch({ type: 'SUCCESS', payload: resource });
        cache.dispatch({ type: 'SET_CACHE', payload: { key: param, value: resource } });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error });
      }
    }, timeout);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [fetchResource, param, cache, timeout]);

  return state;
};

export function useFetchGetPokemonById(fetchResource, param) {
    const cache = useContext(CacheContext);
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    if (cache.state[param]) {
        dispatch({ type: 'SUCCESS', payload: cache.state[param] });
        return;
      }
    const fetch = async () => {
      dispatch({ type: 'LOAD' });
      try {
        const resource = await fetchResource(param);
        dispatch({ type: 'SUCCESS', payload: resource });
        cache.dispatch({ type: 'SET_CACHE', payload: { key: param, value: resource } });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error });
      }
    };
    fetch();
  }, [fetchResource, param, cache]);

  return state;
}

export function useFetchGetPokemon(fetchResource, fetchByUrl, param) {
    const cache = useContext(CacheContext);
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (cache.state[param]) {
        dispatch({ type: 'SUCCESS', payload: cache.state[param] });
        return;
      }
  
    const fetch = async () => {
      dispatch({ type: 'LOAD' });
      try {
        const pokemonList = await fetchResource(param);
        const resource = await Promise.all(
          pokemonList.results.map(async (results) => {
            const pokemonResponse = await fetchByUrl(results.url);
            return await pokemonResponse;
          })
        );
        dispatch({ type: 'SUCCESS', payload: resource });
        cache.dispatch({ type: 'SET_CACHE', payload: { key: param, value: resource } });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error });
      }
    };
    fetch();
  }, [fetchResource, fetchByUrl, param, cache]);

  return state;
}
