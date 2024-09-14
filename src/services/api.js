import axios from 'axios';

const API_URL = 'https://murmuring-river-30150-b941f9b01ee9.herokuapp.com/api';

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
