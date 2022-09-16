import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStorage from './context/GlobalStorage';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStorage>
      <App />
    </GlobalStorage>
  </React.StrictMode>,
);
