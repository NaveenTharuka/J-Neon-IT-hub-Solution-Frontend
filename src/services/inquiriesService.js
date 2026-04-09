// src/services/inquiriesService.js

import { api } from './api';

const API_BASE_URL = api.defaults.baseURL + '/api/inquiries';

export const fetchAllInquiries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/all`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch inquiries');
    return await response.json();
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }
};

export const updateInquiryStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tags`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id, status })
    });
    if (!response.ok) throw new Error('Failed to update inquiry');
    return await response.json();
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    throw error;
  }
};

export const deleteInquiry = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete inquiry');
    return await response.json();
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    throw error;
  }
};
