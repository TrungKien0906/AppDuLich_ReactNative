import axios from 'axios';

const HOST = 'https://phamhuuquyet.pythonanywhere.com/';

export const endpoints = {
  'tours': '/tours/',
  'categories': '/categories/',
  'tickets': (tour_Id) => `/tours/${tour_Id}/tickets/`,
  'news': '/news/',
  'login': '/o/token/',  // Verify if this is the correct authentication endpoint
  'current': '/users/current/' // Make sure this matches with what you're using in Login component
};

export const authApi = (accessToken) => axios.create({
  baseURL: HOST,
  headers: {
    "Authorization": `Bearer ${accessToken}`
  }
});

export default axios.create({
  baseURL: HOST,
});
