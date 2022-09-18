import { CREATE_COMMENT, DELETE_COMMENT } from './types';

export default (state, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };

    case DELETE_COMMENT:
      return {
        ...state,
        messages: state.messages.reduce((arr, msg) => {
          if (msg.id !== action.payload) {
            arr.push({
              ...msg,
              replies: msg.replies.filter(({ id }) => id !== action.payload),
            });
          }

          return arr;
        }, []),
      };

    default: return state;
  }
};
