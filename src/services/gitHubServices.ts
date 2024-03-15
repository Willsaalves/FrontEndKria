import axios from 'axios';

const githubService = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `Bearer YOUR_GITHUB_TOKEN`
  }
});

export default githubService;