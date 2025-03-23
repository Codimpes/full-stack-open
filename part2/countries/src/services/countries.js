import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries";
const baseUrlWeather = "https://api.weatherapi.com/v1/current.json";
const apiWeather = import.meta.env.VITE_KEY_WEATHER;

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/api/all`)
  return request.then((response) => response.data)
}

const getCountry = (name) => {
  const request = axios.get(`${baseUrl}/api/name/${name}`)
  return request.then((response) => response.data);
}

const getWeather = (capitalName) => {
  const request = axios.get(`${baseUrlWeather}?key=${apiWeather}&q=${capitalName}&aqi=no`)
  return request.then((response) => response.data)
}

export default {
  getAllCountries,
  getCountry,
  getWeather,
};
