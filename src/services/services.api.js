import { api } from './api'

export const fetchAllServices = async () => {
  try {
    const response = await api.get('/api/services/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all services:', error);
    throw error;
  }
};

export const fetchServiceById = async (id) => {
  try {
    const response = await api.get(`/api/services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error);
    throw error;
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await api.post('/api/services/add', serviceData);
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

export const updateService = async (id, serviceData) => {
  try {
    const response = await api.put(`/api/services/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error(`Error updating service with ID ${id}:`, error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await api.delete(`/api/services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting service with ID ${id}:`, error);
    throw error;
  }
};

// =============================================
// Service Plans API calls
// =============================================

export const fetchServicePlans = async (serviceId) => {
  try {
    const response = await api.get(`/api/service/plans/serviceId/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service plans:', error);
    throw error;
  }
};

export const fetchPlanById = async (planId) => {
  try {
    const response = await api.get(`/api/service/plans/${planId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching plan with ID ${planId}:`, error);
    throw error;
  }
};

export const fetchAllPlans = async () => {
  try {
    const response = await api.get('/api/service/plans/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all plans:', error);
    throw error;
  }
};

export const createServicePlan = async (planData) => {
  try {
    const response = await api.post('/api/service/plans', planData);
    return response.data;
  } catch (error) {
    console.error('Error creating service plan:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};

export const updateServicePlan = async (planData) => {
  try {
    const response = await api.put('/api/service/plans/id', planData);
    return response.data;
  } catch (error) {
    console.error('Error updating service plan:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};

export const deleteServicePlan = async (planId) => {
  try {
    const response = await api.delete(`/api/service/plans/${planId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting service plan:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};