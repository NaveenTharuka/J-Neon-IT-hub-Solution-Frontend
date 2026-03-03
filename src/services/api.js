import axios from 'axios';

// Set up base URL using Vite's environment variable syntax
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Expected Service response from backend:
 * {
 *   id: string,
 *   title: string,
 *   icon: string,
 *   slug: string,
 *   shortDescription: string,
 *   sortOrder: number
 * }
 */

/**
 * Fetch all services
 */
export const fetchAllServices = async () => {
  try {
    const response = await api.get('/api/services/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all services:', error);
    throw error;
  }
};

/**
 * Fetch a single service by its ID
 */
export const fetchServiceById = async (id) => {
  try {
    const response = await api.get(`/api/services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error);
    throw error;
  }
};
