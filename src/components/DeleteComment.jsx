import React from 'react';
import PropTypes from 'prop-types';
import './DeleteComment.css';

function DeleteComment({ modal, del }) {
  return (
    <div className="delete-message">
      <span className="delete_message-modal">
        <h3>Delete comment</h3>
        <p>
          {
            `Are you sure you want to delete this comment?
            This will remove the comment and can't be undone.`
          }
        </p>

        <div>
          <button type="button" className="cancel-btn" onClick={() => modal(false)}>No, cancel</button>
          <button type="button" className="del-btn" onClick={del}>Yes, delete</button>
        </div>
      </span>
    </div>
  );
}

DeleteComment.propTypes = {
  modal: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
};

export default DeleteComment;
