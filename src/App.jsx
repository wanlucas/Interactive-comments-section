import React from 'react';
import CommentBar from './components/CommentBar';
import Message from './components/Message';
import GlobalContext from './context/globalContext';
import './App.css';

function App() {
  const { messages } = React.useContext(GlobalContext);

  return (
    <div className="App">
      <main>
        <ul className="messages">
          {messages.map((message) => <Message key={message.id} value={message} />)}
        </ul>
        <section className="add-comment">
          <CommentBar type="create" />
        </section>
      </main>
      <footer>
        <div className="attribution">
          <p>
            Challenge by
            <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>
            .
          </p>
          <p>
            Coded by
            <a href="https://github.com/wanlucas">Wan Lucas</a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
