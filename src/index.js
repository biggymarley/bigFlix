import React from 'react';
import ReactDOM from 'react-dom/client';
import '@splidejs/react-splide/css/skyblue';
import './index.css';
import App from './App';
// import '@splidejs/react-splide/css';
// // Default theme
// import '@splidejs/react-splide/css';

// // or other themes
// import '@splidejs/react-splide/css/sea-green';

// or only core styles
// import '@splidejs/react-splide/css/core';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

