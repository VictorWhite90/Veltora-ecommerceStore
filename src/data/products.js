// src/data/products.js
// This file now exports functions that use the dynamic productData service
// Products are fetched from DummyJSON API and cached in localStorage

import { getAllProducts, getProductsByCategory, getProductById, getFeaturedProducts, getNewArrivals } from '../services/productData';

// Export functions that components can use
// These will fetch from DummyJSON API on first call, then use cache

/**
 * Get all products (with caching)
 * @returns {Promise<Array>} - Array of all products
 */
export const getAllProductsData = async () => {
  return await getAllProducts();
};

/**
 * Get products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} - Array of products in category
 */
export const getProductsByCategoryData = async (category) => {
  return await getProductsByCategory(category);
};

/**
 * Get single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} - Product object
 */
export const getProductByIdData = async (id) => {
  return await getProductById(id);
};

/**
 * Get featured products
 * @param {number} limit - Maximum number of products
 * @returns {Promise<Array>} - Array of featured products
 */
export const getFeaturedProductsData = async (limit = 20) => {
  return await getFeaturedProducts(limit);
};

/**
 * Get new arrival products
 * @param {number} limit - Maximum number of products
 * @returns {Promise<Array>} - Array of new arrival products
 */
export const getNewArrivalsData = async (limit = 20) => {
  return await getNewArrivals(limit);
};

// For backward compatibility, export a function that returns products synchronously
// This will return empty array initially, components should use async functions above
export const products = [];

// Helper to initialize products (can be called on app load)
export const initializeProducts = async () => {
  const allProducts = await getAllProducts();
  products.length = 0;
  products.push(...allProducts);
  return products;
};
