import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { ModeContextProvider } from './context/modeContext';
import { BrowserRouter } from 'react-router-dom';
import { PostsContextProvider } from './context/postsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PostsContextProvider>
          <ModeContextProvider>
            <App />
          </ModeContextProvider>
        </PostsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
