import React from 'react';
import PropTypes from 'prop-types';
import { CREATE_COMMENT, DELETE_COMMENT } from './types';
import Context from './globalContext';
import reducer from './globalReducer';
import { messages, user, id as initialId } from '../data/initialData';

export default function GlobalStorage({ children }) {
  const initialState = {
    messages,
    user,
  };

  const [store, dispatch] = React.useReducer(reducer, initialState);
  const [currentId, setCurrentId] = React.useState(initialId);

  const createComment = (text) => {
    const comment = {
      id: currentId,
      content: text,
      createdAt: 'now',
      score: 0,
      user,
      replies: [],
    };

    setCurrentId((prev) => prev + 1);

    try {
      dispatch({
        type: CREATE_COMMENT,
        payload: comment,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = (id) => {
    try {
      dispatch({
        type: DELETE_COMMENT,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const storage = React.useMemo(() => ({
    ...store,
    createComment,
    deleteComment,
  }));

  React.useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(store.messages));
    localStorage.setItem('currentId', JSON.stringify(currentId));
  }, [store.messages]);

  return <Context.Provider value={storage}>{ children }</Context.Provider>;
}

GlobalStorage.propTypes = {
  children: PropTypes.node.isRequired,
};
