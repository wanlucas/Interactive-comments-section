import React from 'react';
import PropTypes from 'prop-types';
import globalContext from '../context/globalContext';
import CommentBar from './CommentBar';

export default function Message({ value }) {
  const { user, deleteComment } = React.useContext(globalContext);
  const {
    content, createdAt, score, replies, user: { username, image }, id,
  } = value;
  const YOU = user.username === username;

  const [editing, setEditing] = React.useState(false);
  const [responding, setResponding] = React.useState(false);

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  const handleReply = () => {
    setResponding((prev) => !prev);
  };

  return (
    <li>
      <div className="comment-header">
        <img src={image} alt={username} className="user-image" />
        <span className="user-name">{ username }</span>
        {YOU && <span>you</span>}
        <p>{createdAt}</p>
      </div>

      <div className="comment">
        <div className="up_down-vote">
          <button type="button">up</button>
          <span>{ score }</span>
          <button type="button">down</button>
        </div>

        <div className="action-buttons">
          {YOU ? (
            <>
              <button type="button" onClick={() => deleteComment(id)}>delete</button>
              <button type="button" onClick={handleEdit}>edit</button>
            </>
          ) : <button type="button" onClick={handleReply}>reply</button>}
        </div>

        <div className="comment-content">
          {editing
            ? <CommentBar type="edit" id={id} />
            : <p>{content}</p>}
        </div>
      </div>

      <ul className="replies">
        {replies && replies.map((replie) => <Message key={replie.id} value={replie} />)}
        {responding && <CommentBar type="reply" id={id} />}
      </ul>
    </li>
  );
}

Message.propTypes = {
  value: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
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
