import axios from 'axios'
// import { useRoute, useRouter } from 'vue-router';
// const router = useRouter();

// const route = useRoute();

const axiosIns = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
})


// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {

  // Retrieve token from localStorage
  const token = localStorage.getItem('accessToken');
  if (token != null) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}
    config.headers.Authorization = token != null ? token : '';
  }
  
  return config
})

// handle 401 response
axiosIns.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    window.location.href = '/login';
  } else if (error.response.status === 500 && error.response.data.message === "Token has expired") {
    // localStorage.removeItem('account');
    window.location.href = '/login';
  } else {
    return Promise.reject(error);
  }
});

export default axiosIns
