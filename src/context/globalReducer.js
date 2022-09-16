import { CREATE_COMMENT } from './types';

export default (state, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    default: return state;
  }
};
