import {
  CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, REPLY_COMMENT,
} from './types';

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

    case EDIT_COMMENT:
      return {
        ...state,
        messages: state.messages.map((msg) => (
          msg.id === action.id ? {
            ...msg,
            content: action.payload,
          } : {
            ...msg,
            replies: msg.replies.map((rep) => (
              rep.id === action.id ? {
                ...rep,
                content: action.payload,
              } : rep
            )),
          }
        )),
      };

    case REPLY_COMMENT:
      return {
        ...state,
        messages: state.messages.map((msg) => (
          msg.id === action.info.id
          || msg.replies.some(({ id }) => id === action.info.id)
            ? {
              ...msg,
              replies: msg.replies.concat({
                ...action.payload,
                replyingTo: action.info.to,
              }),
            } : msg
        )),
      };

    default: return state;
  }
};
