import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { ModeContextProvider } from './context/modeContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ModeContextProvider>
          <App />
        </ModeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
