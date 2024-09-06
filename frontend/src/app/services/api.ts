// services/api.ts
import axios from 'axios';

export const API_ENDPOINT = "http://localhost:8080/api";

export const postDataMethod = async (url: string, data: object) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error making POST request:', error);
    throw error;
  }
};