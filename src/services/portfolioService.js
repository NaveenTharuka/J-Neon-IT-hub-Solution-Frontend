import { api } from './api';

export const getPortfolioItems = async () => {
    try {
        const response = await api.get('/api/portfolio-items/get-all');
        return response.data;
    } catch (error) {
        console.error("Error fetching portfolio items", error);
        throw error;
    }
};

export const getPortfolioItemById = async (id) => {
    try {
        const response = await api.get(`/api/portfolio-items/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching portfolio item with id ${id}`, error);
        throw error;
    }
};

export const createPortfolioItem = async (portfolioData) => {
    try {
        const response = await api.post('/api/portfolio-items/create', portfolioData);
        return response.data;
    } catch (error) {
        console.error("Error creating portfolio item", error);
        throw error;
    }
};

export const updatePortfolioItem = async (id, portfolioData) => {
    try {
        const response = await api.put(`/api/portfolio-items/${id}`, portfolioData);
        return response.data;
    } catch (error) {
        console.error(`Error updating portfolio item with id ${id}`, error);
        throw error;
    }
};

export const deletePortfolioItem = async (id) => {
    try {
        // Try to delete associated images first (if endpoint exists)
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

        await api.delete(`/api/portfolio-items/${id}`);
    } catch (error) {
        console.error(`Error deleting portfolio item with id ${id}`, error);
        throw error;
    }
};

// --- Portfolio Images ---

export const getPortfolioImages = async (portfolioItemId) => {
    try {
        const response = await api.get(`/api/admin/portfolio-items/${portfolioItemId}/images`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching images for portfolio item ${portfolioItemId}`, error);
        throw error;
    }
};

export const addPortfolioImage = async (portfolioItemId, imageData) => {
    try {
        const response = await api.post(`/api/admin/portfolio-items/${portfolioItemId}/images`, imageData);
        return response.data;
    } catch (error) {
        console.error(`Error adding image to portfolio item ${portfolioItemId}`, error);
        throw error;
    }
};

export const updatePortfolioImage = async (portfolioItemId, imageId, imageData) => {
    try {
        const response = await api.put(`/api/admin/portfolio-items/${portfolioItemId}/images/${imageId}`, imageData);
        return response.data;
    } catch (error) {
        console.error(`Error updating image ${imageId}`, error);
        throw error;
    }
};

export const deletePortfolioImage = async (portfolioItemId, imageId) => {
    try {
        await api.delete(`/api/admin/portfolio-items/${portfolioItemId}/images/${imageId}`);
    } catch (error) {
        console.error(`Error deleting image ${imageId}`, error);
        throw error;
    }
};