import axios from 'axios';

// URL to make requests
const getURL = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default getURL;
