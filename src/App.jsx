import React from 'react';
import CommentBar from './components/CommentBar';
import Message from './components/Message';
import { GlobalContext } from './GlobalContext';

function App() {
  const { messages } = React.useContext(GlobalContext);

  return (
    <div className="App">
      <main>
        <ul className="messages">
          {messages.map((message) => <Message key={message.id} value={message} />)}
        </ul>
        <section className="add-comment">
          <CommentBar />
        </section>
      </main>
      <footer>
        <div className="attribution">
          Challenge by
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>
          .
          Coded by
          <a href="#https://github.com/wanlucas">Your Name Here</a>
          .
        </div>
      </footer>
    </div>
  );
}

export default App;
