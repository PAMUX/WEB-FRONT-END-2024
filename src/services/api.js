import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getTrainLocations = async () => {
  const response = await axios.get(`${API_URL}/locations`);
  return response.data;
};

export const addTrainLocation = async (data, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(`${API_URL}/locations`, data, config);
  return response.data;
};
