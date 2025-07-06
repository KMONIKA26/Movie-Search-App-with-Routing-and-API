import axios from "axios";

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual key
const BASE_URL = `https://www.omdbapi.com/`;

export const searchMovies = (title) =>
  axios.get(BASE_URL, {
    params: { s: title, apikey: API_KEY },
  });

export const getMovieById = (id) =>
  axios.get(BASE_URL, {
    params: { i: id, apikey: API_KEY },
  });
