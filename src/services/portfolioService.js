import { api } from './api';

// =============================================
// API Endpoints Configuration
// =============================================

const API_ENDPOINTS = {
    // Portfolio Items endpoints
    portfolioItems: {
        getAll: () => '/api/portfolio-items/get-all',
        getById: (id) => `/api/portfolio-items/${id}`,
        create: () => '/api/portfolio-items/create',
        update: (id) => `/api/portfolio-items/${id}`,
        delete: (id) => `/api/portfolio-items/${id}`,
    },

    // Portfolio Images endpoints
    portfolioImages: {
        getAll: (portfolioItemId) => `/api/admin/portfolio-items/${portfolioItemId}/images`,
        getById: (portfolioItemId, imageId) => `/api/admin/portfolio-items/${portfolioItemId}/images/${imageId}`,
        create: (portfolioItemId) => `/api/admin/portfolio-items/${portfolioItemId}/images`,
        update: (portfolioItemId, imageId) => `/api/admin/portfolio-items/${portfolioItemId}/images/${imageId}`,
        delete: (portfolioItemId, imageId) => `/api/admin/portfolio-items/${portfolioItemId}/images/${imageId}`,
    }
};

// =============================================
// Portfolio Items API calls
// =============================================

/**
 * Fetch all portfolio items
 */
export const getPortfolioItems = async () => {
    try {
        const response = await api.get(API_ENDPOINTS.portfolioItems.getAll());
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio items", error);
        throw error;
    }
};

/**
 * Fetch a single portfolio item by ID
 */
export const getPortfolioItemById = async (id) => {
    try {
        const response = await api.get(API_ENDPOINTS.portfolioItems.getById(id));
        return response.data;
    } catch (error) {
        console.error(`Error fetching portfolio item with id ${id}`, error);
        throw error;
    }
};

/**
 * Create a new portfolio item
 * Expected portfolioData: { title, description, category, etc. }
 */
export const createPortfolioItem = async (portfolioData) => {
    try {
        const response = await api.post(API_ENDPOINTS.portfolioItems.create(), portfolioData);
        return response.data;
    } catch (error) {
        console.error("Error creating portfolio item", error);
        throw error;
    }
};

/**
 * Update an existing portfolio item
 * Expected portfolioData: { title, description, category, etc. }
 */
export const updatePortfolioItem = async (id, portfolioData) => {
    try {
        const response = await api.put(API_ENDPOINTS.portfolioItems.update(id), portfolioData);
        return response.data;
    } catch (error) {
        console.error(`Error updating portfolio item with id ${id}`, error);
        throw error;
    }
};

/**
 * Delete a portfolio item and its associated images
 */
export const deletePortfolioItem = async (id) => {
    try {
        // Fallback for missing backend cascade delete: manually remove images first
        try {
            const images = await getPortfolioImages(id);
            if (images && images.length > 0) {
                await Promise.all(images.map(img =>
                    deletePortfolioImage(id, img.id)
                ));
            }
        } catch (imgError) {
            console.warn(`Could not delete associated images for portfolio item ${id}`, imgError);
        }

        await api.delete(API_ENDPOINTS.portfolioItems.delete(id));
    } catch (error) {
        console.error(`Error deleting portfolio item with id ${id}`, error);
        throw error;
    }
};

// =============================================
// Portfolio Images API calls
// =============================================

/**
 * Fetch all images for a portfolio item
 */
export const getPortfolioImages = async (portfolioItemId) => {
    try {
        const response = await api.get(API_ENDPOINTS.portfolioImages.getAll(portfolioItemId));
        return response.data;
    } catch (error) {
        console.error(`Error fetching images for portfolio item ${portfolioItemId}`, error);
        throw error;
    }
};

/**
 * Add a new image to a portfolio item
 * Expected imageData: FormData with image file and metadata
 */
export const addPortfolioImage = async (portfolioItemId, imageData) => {
    try {
        const response = await api.post(API_ENDPOINTS.portfolioImages.create(portfolioItemId), imageData);
        return response.data;
    } catch (error) {
        console.error(`Error adding image to portfolio item ${portfolioItemId}`, error);
        throw error;
    }
};

/**
 * Update an existing portfolio image
 * Expected imageData: { caption, sortOrder, isFeatured, etc. }
 */
export const updatePortfolioImage = async (portfolioItemId, imageId, imageData) => {
    try {
        const response = await api.put(API_ENDPOINTS.portfolioImages.update(portfolioItemId, imageId), imageData);
        return response.data;
    } catch (error) {
        console.error(`Error updating image ${imageId}`, error);
        throw error;
    }
};

/**
 * Delete a portfolio image
 */
export const deletePortfolioImage = async (portfolioItemId, imageId) => {
    try {
        await api.delete(API_ENDPOINTS.portfolioImages.delete(portfolioItemId, imageId));
    } catch (error) {
        console.error(`Error deleting image ${imageId}`, error);
        throw error;
    }
};