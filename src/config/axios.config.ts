import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 1000,
  });

export default AxiosInstance;