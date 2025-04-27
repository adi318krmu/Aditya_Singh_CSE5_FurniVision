// Base URL for all API requests
const API_URL = 'http://localhost:5000/api';

// Helper function for making API requests
async function fetchAPI(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json'
  };
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// AR API endpoints
const AR_API = {
  // Get all available AR models
  getModels: async () => {
    try {
      const response = await fetch(`${API_URL}/ar/models`);
      if (!response.ok) throw new Error('Failed to fetch AR models');
      return await response.json();
    } catch (error) {
      console.error('Error fetching AR models:', error);
      throw error;
    }
  },

  // Get specific model by ID
  getModelById: async (modelId) => {
    try {
      const response = await fetch(`${API_URL}/ar/models/${modelId}`);
      if (!response.ok) throw new Error('Failed to fetch AR model');
      return await response.blob(); // Use blob() for binary data
    } catch (error) {
      console.error('Error fetching AR model:', error);
      throw error;
    }
  },

  // Get model URL for a specific product
  getProductModel: async (productId) => {
    try {
      const response = await fetch(`${API_URL}/ar/products/${productId}/model`);
      if (!response.ok) throw new Error('Failed to fetch product model');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product model:', error);
      throw error;
    }
  }
};

// Product API endpoints
const ProductAPI = {
  // Get all products
  getAll: async () => {
    return fetchAPI('/v1/products');
  },

  // Get product by ID
  getById: async (id) => {
    return fetchAPI(`/v1/products/${id}`);
  },

  // Get products by category
  getByCategory: async (category) => {
    return fetchAPI(`/v1/products/category/${category}`);
  }
};

// Export the API objects
window.AR_API = AR_API;
window.ProductAPI = ProductAPI;

// API functions
const API = {
  // Auth endpoints
  auth: {
    login: (email, password) => {
      return fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
    },
    register: (name, email, password) => {
      return fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });
    },
    getProfile: () => {
      return fetchAPI('/auth/me');
    }
  },
  
  // Product endpoints
  products: {
    getAll: () => {
      return fetchAPI('/products');
    },
    getById: (id) => {
      return fetchAPI(`/products/${id}`);
    }
  },
  
  // AR-specific endpoints
  ar: {
    getARProducts: () => {
      return fetchAPI('/ar/products');
    },
    getARModel: (productId) => {
      return fetchAPI(`/ar/products/${productId}/model`);
    }
  },
  
  // Order endpoints
  orders: {
    create: (orderData) => {
      return fetchAPI('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
    },
    getMyOrders: () => {
      return fetchAPI('/orders/myorders');
    },
    getById: (id) => {
      return fetchAPI(`/orders/${id}`);
    },
    updateToPaid: (id, paymentResult) => {
      return fetchAPI(`/orders/${id}/pay`, {
        method: 'PUT',
        body: JSON.stringify(paymentResult)
      });
    }
  },
  
  // Payment endpoints
  payments: {
    createPaymentIntent: (amount) => {
      return fetchAPI('/payments', {
        method: 'POST',
        body: JSON.stringify({ amount })
      });
    }
  }
};