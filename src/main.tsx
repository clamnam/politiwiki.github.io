import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import axios from 'axios'

// // Configure axios globally
// axios.defaults.withCredentials = true;
// // Add request debugging
// axios.interceptors.request.use(request => {
//   console.log('Starting Request:', request);
//   return request;
// });
// // Add response debugging
// axios.interceptors.response.use(
//   response => {
//     console.log('Response:', response);
//     return response;
//   },
//   error => {
//     console.error('Response Error:', error.response || error);
//     return Promise.reject(error);
//   }
// );

// Initialize theme before render to prevent flash
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
};

initTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
