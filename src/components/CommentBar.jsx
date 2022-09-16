import React from 'react';
import GlobalContext from '../context/globalContext';

function CommentBar() {
  const [comment, setComment] = React.useState('');
  const { createComment } = React.useContext(GlobalContext);

  const handleChange = ({ target: { value } }) => {
    setComment(value);
  };

  const handleSubmit = (event) => {
    createComment(comment);
    event.preventDefault();
  };

  return (
    <form className="comment-bar" onSubmit={handleSubmit}>
      <input type="textArea" placeholder="Add a comment..." onChange={handleChange} />
      <img src="" alt="" />
      <input type="button" value="send" />
    </form>
  );
}

export default CommentBar;
