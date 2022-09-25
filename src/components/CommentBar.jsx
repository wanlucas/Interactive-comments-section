import React from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context/globalContext';
import { user } from '../data/initialData';
import './CommentBar.css';

function CommentBar({ type, id, to, modal }) { // eslint-disable-line
  const [comment, setComment] = React.useState('');
  const { createComment, editComment, replyComment } = React.useContext(GlobalContext);

  const handleChange = ({ target: { value } }) => {
    setComment(value);
  };

  const buttons = {
    edit: 'Update',
    create: 'Send',
    reply: 'Reply',
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    switch (type) {
      case 'edit':
        editComment(id, comment);
        break;
      case 'reply':
        replyComment({ id, to }, comment);
        break;
      default: createComment(comment);
    }

    if (modal) modal(false);
    else setComment('');
  };

  return (
    <form className="comment-bar" onSubmit={handleSubmit}>
      { type !== 'edit' && <img src={user.image} alt={user.username} /> }
      <input type="text" className="text-bar" placeholder="Add a comment..." value={comment} onChange={handleChange} />
      <input type="submit" className="send-btn" value={buttons[type]} />
    </form>
  );
}

CommentBar.propTypes = {
  type: PropTypes.string,
  modal: PropTypes.func,
  id: PropTypes.number,
  to: PropTypes.string,
};

CommentBar.defaultProps = {
  type: null,
  modal: null,
  id: null,
  to: null,
};

export default CommentBar;
