import { useEffect, useReducer, createContext } from 'react';

export const CacheContext = createContext();
CacheContext.displayName = 'Cache';

const cacheReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CACHE':
      return {
        ...state,
        [payload.key]: payload.value,
      };
    default:
      return state;
  }
};

export function CacheProvider({ children }) {
  const [state, dispatch] = useReducer(
    cacheReducer,
    JSON.parse(localStorage.getItem('POKEMON_CACHE')) || {},
  );

  useEffect(() => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('POKEMON_CACHE', serializedState);
  }, [state]);

  return <CacheContext.Provider value={{ state, dispatch }}>{children}</CacheContext.Provider>;
}
