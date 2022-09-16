import React from 'react';
import PropTypes from 'prop-types';
import { messages as initialMessages, user, id as initialId } from './data/initialData';

export const GlobalContext = React.createContext();

export function GlobalStorage({ children }) {
  const [messages, setMessages] = React.useState(initialMessages);
  const [currentId, setCurrentId] = React.useState(initialId);

  const createNewComment = (text) => {
    const newMessage = {
      id: currentId,
      content: text,
      createdAt: 'Now',
      score: 0,
      user,
      replies: [],
    };

    setMessages((prev) => ([...prev, newMessage]));
  };

  React.useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  React.useEffect(() => {
    setCurrentId((prev) => prev + 1);
  }, [messages.length]);

  const store = React.useMemo(() => ({
    messages,
    createNewComment,
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
