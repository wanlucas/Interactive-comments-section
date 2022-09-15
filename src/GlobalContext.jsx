import React from 'react';
import PropTypes from 'prop-types';
import { messages, user } from './data/initialData';

export const GlobalContext = React.createContext();

export function GlobalStorage({ children }) {
  const store = React.useMemo(() => ({
    messages: JSON.parse(localStorage.getItem('messages')) || messages,
    user,
  }));

  return (
    <GlobalContext.Provider value={store}>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalStorage.propTypes = {
  children: PropTypes.node.isRequired,
};
