import axios from 'axios';

// Set up base URL using Vite's environment variable syntax
<<<<<<< HEAD
const API_BASE_URL = 'https://j-neon-it-hub-backend.onrender.com';
=======
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://j-neon-it-hub-backend.onrender.com';
>>>>>>> 342129567d418444c18ea1888fcba3407ea18423

export const api = axios.create({
  baseURL: API_BASE_URL,
});
