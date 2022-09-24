import React from 'react';
import PropTypes from 'prop-types';

function DeleteComment({ modal, del }) {
  return (
    <div>
      <span className="delete_message-modal">
        <h3>Delete comment</h3>
        <p>
          {
            `Are you sure you want to delete this comment?
            This will remove the comment and can't be undone`
          }
        </p>
        <button type="button" onClick={() => modal(false)}>No, cancel</button>
        <button type="button" onClick={del}>Yes, delete</button>
      </span>
    </div>
  );
}

DeleteComment.propTypes = {
  modal: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
};

export default DeleteComment;
