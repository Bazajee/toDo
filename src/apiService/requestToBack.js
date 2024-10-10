import axios from 'axios'

const API_URL = 'http://localhost:3003'

const apiClient = axios.create({
  baseURL: API_URL,
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const fetchData = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  }
  
  export const postRequest = async ( endPoint, formData) => {
    const response = await axios.post(`${API_URL}${endPoint}`, formData, {
      withCredentials: true,
    })
    return response.data;
  }