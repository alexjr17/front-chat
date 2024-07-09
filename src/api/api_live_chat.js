import axios from 'axios';

const axiosIns = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
});

// Add request interceptor
axiosIns.interceptors.request.use(config => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('accessToken');
  if (token) {
    // Attach token to headers
    config.headers.Authorization = `${token}`;
    // window.location.href = '/chat';

  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Handle response errors
axiosIns.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        
        window.location.href = '/login';
      } else if (error.response.status === 500 &&error.response.data.message !== undefined && error.response.data.message === 'Token has expired') {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        
        window.location.href = '/login';
      } else {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosIns;
