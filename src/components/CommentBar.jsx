import React from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context/globalContext';

function CommentBar({ type, id }) {
  const [comment, setComment] = React.useState('');
  const { createComment, editComment, replyComment } = React.useContext(GlobalContext);

  const handleChange = ({ target: { value } }) => {
    setComment(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    switch (type) {
      case 'edit':
        editComment(id, comment);
        break;
      case 'reply':
        replyComment(id, comment);
        break;
      default: createComment(comment);
    }

    setComment('');
  };

  return (
    <form className="comment-bar" onSubmit={handleSubmit}>
      <input type="textArea" placeholder="Add a comment..." value={comment} onChange={handleChange} />
      <img src="" alt="" />
      <input type="button" value="send" />
    </form>
  );
}

CommentBar.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number,
};

CommentBar.defaultProps = {
  type: 'create',
  id: null,
};

export default CommentBar;
