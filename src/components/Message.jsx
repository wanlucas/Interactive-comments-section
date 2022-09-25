import React from 'react';
import PropTypes from 'prop-types';
import globalContext from '../context/globalContext';
import fromNow from '../services/date';
import CommentBar from './CommentBar';
import DeleteComment from './DeleteComment';
import './Message.css';

import {
  delete as deleteImg, edit, plus, minus, reply,
} from '../images/images';

export default function Message({ value }) {
  const {
    content, createdAt, score, replies, user: { username, image }, id, replyingTo,
  } = value;

  const { user, deleteComment, addVote } = React.useContext(globalContext);
  const YOU = user.username === username;

  const [editing, setEditing] = React.useState(false);
  const [responding, setResponding] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  const handleReply = () => {
    setResponding((prev) => !prev);
  };

  const handleVotes = ({ target: { name } }) => {
    addVote(id, { up: 1, down: -1 }[name]);
  };

  return (
    <li>
      <div className="comment">
        <div className="comment-header">
          <img src={image} alt={username} className="user-image" />
          <span className="user-name">{ username }</span>
          {YOU && <span className="you">you</span>}
          <p>{fromNow(createdAt)}</p>
        </div>

        <div className="up_down-vote">
          <button type="button" name="up" onClick={handleVotes}>
            <img src={plus} alt="minus" />
          </button>
          <span>{ score }</span>
          <button type="button" name="down" onClick={handleVotes}>
            <img src={minus} alt="minus" />
          </button>
        </div>

        <div className="action-buttons">
          {YOU ? (
            <>
              <button type="button" onClick={() => setDeleting(true)}>
                <img src={deleteImg} alt="trash" />
              </button>

              <button type="button" onClick={handleEdit}>
                <img src={edit} alt="pen" />
              </button>
            </>
          ) : (
            <button type="button" onClick={handleReply}>
              <img src={reply} alt="reply" />
            </button>
          )}
        </div>

        <div className="comment-text">
          {editing
            ? <CommentBar type="edit" id={id} modal={setEditing} />
            : (
              <p>
                {replyingTo && <span className="mention">{`@${replyingTo}`}</span>}
                {content}
              </p>
            )}
        </div>
      </div>

      <ul className="replies">
        {replies && replies.map((replie) => <Message key={replie.id} value={replie} />)}
        {responding && <CommentBar type="reply" id={id} to={username} modal={setResponding} />}
      </ul>

      {deleting && <DeleteComment del={() => deleteComment(id)} modal={setDeleting} />}
    </li>
  );
}

Message.propTypes = {
  value: PropTypes.shape({
    replyingTo: PropTypes.string,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
    replies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })),
  }).isRequired,
};
