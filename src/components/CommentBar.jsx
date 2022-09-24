import React from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context/globalContext';

function CommentBar({ type, id, to, modal }) { // eslint-disable-line
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
        replyComment({ id, to }, comment);
        break;
      default: createComment(comment);
    }

    if (modal) modal(false);
  };

  return (
    <form className="comment-bar" onSubmit={handleSubmit}>
      <div className="text-area">
        { to && <span className="mention">{`@${to}`}</span> }
        <input type="textArea" placeholder="Add a comment..." value={comment} onChange={handleChange} />
      </div>

      <img src="" alt="" />
      <input type="submit" value="send" />
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
