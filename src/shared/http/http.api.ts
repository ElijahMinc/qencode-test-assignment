import axios from 'axios';

const $AuthApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/${
    import.meta.env.VITE_VERSION_API
  }`,
});

export { $AuthApi };
