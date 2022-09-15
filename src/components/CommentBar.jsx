import React from 'react';

function CommentBar() {
  const handleSubmit = () => {

  };

  return (
    <form className="comment-bar">
      <input type="textArea" placeholder="Add a comment..." />
      <img src="" alt="" />
      <input type="button" onClick={handleSubmit} value="send" />
    </form>
  );
}

export default CommentBar;
