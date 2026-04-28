import { api } from './api';

export const fetchAllContacts = async () => {
  try {
    const response = await api.get('/contact/get-all', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching all contacts:', error);
    throw error;
  }
};

export const fetchContactById = async (id) => {
  try {
    const response = await api.get(`/contact/get/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Error fetching contact with ID ${id}:`, error);
    throw error;
  }
};

export const createContact = async (contactData) => {
  try {
    const response = await api.post('/contact/post', contactData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

export const updateContactTag = async (id, status) => {
  try {
    const response = await api.put('/contact/tags', { id, status }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error updating contact tag:', error);
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/contact/delete/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Error deleting contact with ID ${id}:`, error);
    throw error;
  }
};
