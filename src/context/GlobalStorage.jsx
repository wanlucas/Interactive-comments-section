import React from 'react';
import PropTypes from 'prop-types';
import Context from './globalContext';
import reducer from './globalReducer';
import { messages, user, id as initialId } from '../data/initialData';
import {
  CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, REPLY_COMMENT,
} from './types';

export default function GlobalStorage({ children }) {
  const initialState = {
    messages,
    user,
  };

  const [store, dispatch] = React.useReducer(reducer, initialState);
  const [currentId, setCurrentId] = React.useState(initialId);

  const activate = (action) => {
    try {
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

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

    activate({
      type: CREATE_COMMENT,
      payload: comment,
    });
  };

  const deleteComment = (id) => activate({
    type: DELETE_COMMENT,
    payload: id,
  });

  const editComment = (id, text) => activate({
    type: EDIT_COMMENT,
    payload: text,
    id,
  });

  const replyComment = (id, reply) => {
    const comment = {
      id: currentId,
      content: reply,
      createdAt: 'now',
      score: 0,
      user,
    };

    setCurrentId((prev) => prev + 1);

    activate({
      type: REPLY_COMMENT,
      payload: comment,
      id,
    });
  };

  const storage = React.useMemo(() => ({
    ...store,
    createComment,
    deleteComment,
    replyComment,
    editComment,
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
