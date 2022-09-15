import React from 'react';
import PropTypes from 'prop-types';

export default function Message({ value }) {
  const {
    content, createdAt, score, replies, user: { username, image },
  } = value;

  return (
    <li>
      <div className="comment-header">
        <img src={image} alt={username} className="user-image" />
        <span className="user-name">{ username }</span>
        <p>{createdAt}</p>
      </div>

      <div className="comment-content">
        <div className="up_down-vote">
          <button type="button">up</button>
          <span>{ score }</span>
          <button type="button">down</button>
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
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
    replies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })),
  }).isRequired,
};
