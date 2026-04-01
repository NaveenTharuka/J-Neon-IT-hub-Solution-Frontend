import { api } from './api';

// =============================================
// API Endpoints Configuration
// =============================================

const API_ENDPOINTS = {
  // Services endpoints
  services: {
    getAll: () => '/api/services/all',
    getById: (id) => `/api/services/${id}`,
    create: () => '/api/services/add',
    update: (id) => `/api/services/${id}`,
    delete: (id) => `/api/services/${id}`,
  },

  // Service Plans endpoints
  plans: {
    getAll: () => '/api/service/plans/all',
    getById: (id) => `/api/service/plans/${id}`,
    getByServiceId: (serviceId) => `/api/service/plans/serviceId/${serviceId}`,
    create: () => '/api/service/plans',
    update: () => '/api/service/plans',
    delete: (id) => `/api/service/plans/${id}`,
  }
};

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

// =============================================
// Services API calls
// =============================================

/**
 * Fetch all services
 */
export const fetchAllServices = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.services.getAll());
    console.log('Fetched services:', response.data);
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
    const response = await api.get(API_ENDPOINTS.services.getById(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new service
 * Expected serviceData: { title, shortDescription, slug, icon, isActive }
 */
export const createService = async (serviceData) => {
  try {
    const response = await api.post(API_ENDPOINTS.services.create(), serviceData);
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

/**
 * Update an existing service
 * Expected serviceData: { title, shortDescription, slug, icon, isActive }
 */
export const updateService = async (id, serviceData) => {
  try {
    const response = await api.put(API_ENDPOINTS.services.update(id), serviceData);
    return response.data;
  } catch (error) {
    console.error(`Error updating service with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a service
 */
export const deleteService = async (id) => {
  try {
    const response = await api.delete(API_ENDPOINTS.services.delete(id));
    return response.data;
  } catch (error) {
    console.error(`Error deleting service with ID ${id}:`, error);
    throw error;
  }
};

// =============================================
// Service Plans API calls
// =============================================

/**
 * Fetch all plans for a specific service
 */
export const fetchServicePlans = async (serviceId) => {
  try {
    const response = await api.get(API_ENDPOINTS.plans.getByServiceId(serviceId));
    return response.data;
  } catch (error) {
    console.error('Error fetching service plans:', error);
    throw error;
  }
};

/**
 * Fetch a single plan by its ID
 */
export const fetchPlanById = async (planId) => {
  try {
    const response = await api.get(API_ENDPOINTS.plans.getById(planId));
    return response.data;
  } catch (error) {
    console.error(`Error fetching plan with ID ${planId}:`, error);
    throw error;
  }
};

/**
 * Fetch all plans (across all services)
 */
export const fetchAllPlans = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.plans.getAll());
    return response.data;
  } catch (error) {
    console.error('Error fetching all plans:', error);
    throw error;
  }
};

/**
 * Create a new service plan
 * Expected planData: { serviceId, name, description, price, duration, features, isActive }
 */
export const createServicePlan = async (planData) => {
  try {
    const response = await api.post(API_ENDPOINTS.plans.create(), planData);
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

/**
 * Update an existing service plan
 * Expected planData includes id field
 */
export const updateServicePlan = async (planData) => {
  try {
    const response = await api.put(API_ENDPOINTS.plans.update(), planData);
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

/**
 * Delete a service plan
 */
export const deleteServicePlan = async (planId) => {
  try {
    const response = await api.delete(API_ENDPOINTS.plans.delete(planId));
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