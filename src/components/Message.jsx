import React from 'react';
import PropTypes from 'prop-types';
import globalContext from '../context/globalContext';

export default function Message({ value }) {
  const { user, deleteComment } = React.useContext(globalContext);
  const {
    content, createdAt, score, replies, user: { username, image }, id,
  } = value;
  const YOU = user.username === username;

  return (
    <li>
      <div className="comment-header">
        <img src={image} alt={username} className="user-image" />
        <span className="user-name">{ username }</span>
        {YOU && <span>you</span>}
        <p>{createdAt}</p>
      </div>

      <div className="comment-content">
        <div className="up_down-vote">
          <button type="button">up</button>
          <span>{ score }</span>
          <button type="button">down</button>
        </div>

        <div className="action-buttons">
          {YOU ? (
            <>
              <button type="button" onClick={() => deleteComment(id)}>delete</button>
              <button type="button">edit</button>
            </>
          ) : <button type="button">reply</button>}
        </div>

        <p>{content}</p>
      </div>

      <ul className="replies">
        {replies && replies.map((replie) => <Message key={replie.id} value={replie} />)}
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
