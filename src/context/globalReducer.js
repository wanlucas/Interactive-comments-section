import {
  CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, REPLY_COMMENT, ADD_VOTE,
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

    case ADD_VOTE: {
      const { id, payload } = action;
      const { user, messages } = state;
      const current = user.votes.find((msg) => msg.id === id);

      return {
        ...state,
        user: {
          ...user,
          votes: current
            ? user.votes.filter((msg) => msg.id !== id)
            : user.votes.concat({ id, vote: payload }),
        },
        messages: messages.map((msg) => (
          msg.id === id ? {
            ...msg,
            score: current ? msg.score - current.vote : msg.score + payload,
          } : msg
        )),
      };
    }

    default: return state;
  }
};
