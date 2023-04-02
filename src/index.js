import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { ModeContextProvider } from './context/modeContext';
import { BrowserRouter } from 'react-router-dom';
import { PostsContextProvider } from './context/postsContext';
import { UsersContextProvider } from './context/usersContext';
import { FollowUserContextProvider } from './context/followUserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <FollowUserContextProvider>
          <PostsContextProvider>
            <UsersContextProvider>
              <ModeContextProvider>
                <App />
              </ModeContextProvider>
            </UsersContextProvider>
          </PostsContextProvider>
        </FollowUserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
