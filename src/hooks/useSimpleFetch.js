import { useEffect, useReducer } from 'react';

const initialState = { loading: false, data: null, error: null };

const fetchReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD':
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
      };
    case 'FAILURE':
      return {
        ...state,
        loading: false,
        data: null,
        error: payload,
      };
    default:
      return state;
  }
};

export const useFetchTimeoutGetPokemon = (fetchResource, param, timeout) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      dispatch({ type: 'LOAD' });
      try {
        const resource = await fetchResource(param);
        dispatch({ type: 'SUCCESS', payload: resource });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error });
      }
    }, timeout);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [fetchResource, param, timeout]);

  return state;
};

export function useFetchGetPokemonById(fetchResource, param) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: 'LOAD' });
      try {
        const resource = await fetchResource(param);
        dispatch({ type: 'SUCCESS', payload: resource });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error });
      }
    };
    fetch();
  }, [fetchResource, param]);

  return state;
}

export function useFetchGetPokemon(fetchResource, fetchByUrl, param) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: 'LOAD' });
      try {
        const pokemonList = await fetchResource(param);
        const resource = await Promise.all(
          pokemonList.results.map(async (results) => {
            const pokemonResponse = await fetchByUrl(results.url);
            return pokemonResponse;
          }),
        );
        dispatch({ type: 'SUCCESS', payload: resource });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error });
      }
    };
    fetch();
  }, [fetchResource, fetchByUrl, param]);

  return state;
}
