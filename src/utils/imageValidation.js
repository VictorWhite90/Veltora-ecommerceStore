// src/utils/imageValidation.js

// Category-specific keyword matching for validation
const categoryKeywords = {
  'phones-tablets': ['phone', 'iphone', 'samsung', 'tablet', 'ipad', 'mobile', 'smartphone', 'galaxy', 'xiaomi', 'oneplus'],
  computing: ['laptop', 'computer', 'macbook', 'desktop', 'monitor', 'pc', 'notebook', 'chromebook', 'thinkpad'],
  fashion: ['shirt', 'dress', 'shoe', 'watch', 'bag', 'jean', 'jacket', 'sneaker', 'boot', 'sandal', 'handbag', 'jewelry', 'ring', 'necklace'],
  appliances: ['refrigerator', 'washer', 'dryer', 'microwave', 'oven', 'fridge', 'washing', 'air conditioner', 'ac', 'stove'],
  gaming: ['playstation', 'xbox', 'nintendo', 'console', 'controller', 'game', 'switch', 'gaming', 'ps5', 'xbox'],
  'health-beauty': ['perfume', 'skincare', 'makeup', 'lipstick', 'cream', 'serum', 'fragrance', 'cosmetic', 'beauty'],
  'home-office': ['furniture', 'chair', 'table', 'sofa', 'desk', 'lamp', 'decor', 'cushion', 'rug', 'mirror'],
  supermarket: ['grocery', 'food', 'beverage', 'snack', 'cereal', 'milk', 'bread', 'juice', 'water', 'canned'],
  'baby-products': ['baby', 'stroller', 'diaper', 'bottle', 'toy', 'infant', 'toddler', 'crib', 'pacifier'],
  electronics: ['tv', 'television', 'headphone', 'speaker', 'camera', 'drone', 'tv', 'soundbar', 'audio'],
};

// Category placeholder images (using Unsplash with specific IDs)
const categoryPlaceholders = {
  'phones-tablets': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
  computing: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
  fashion: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
  appliances: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop',
  gaming: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop',
  'health-beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
  'home-office': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
  supermarket: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=400&h=400&fit=crop',
  'baby-products': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
};

/**
 * Validate if product title matches its category
 * @param {Object} product - Product object with title and category
 * @returns {boolean} - True if title contains category-relevant keywords
 */
export const titleMatchesCategory = (product) => {
  if (!product.title || !product.category) return false;

  const title = product.title.toLowerCase();
  const category = product.category.toLowerCase();
  const keywords = categoryKeywords[category] || [];

  if (keywords.length === 0) return true; // If no keywords defined, assume valid

  return keywords.some((keyword) => title.includes(keyword));
};

/**
 * Check if product has valid images
 * @param {Object} product - Product object
 * @returns {boolean} - True if product has at least one image
 */
export const hasValidImage = (product) => {
  return product.images && Array.isArray(product.images) && product.images.length > 0;
};

/**
 * Comprehensive product image validation
 * @param {Object} product - Product object to validate
 * @returns {Object} - Validation results
 */
export const validateProductImage = (product) => {
  return {
    hasValidImage: hasValidImage(product),
    titleMatchesCategory: titleMatchesCategory(product),
    isValid: hasValidImage(product) && titleMatchesCategory(product),
  };
};

/**
 * Test if an image URL loads successfully
 * @param {string} imageUrl - Image URL to test
 * @returns {Promise<boolean>} - True if image loads successfully
 */
export const imageLoadTest = (imageUrl) => {
  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imageUrl;

    // Timeout after 5 seconds
    setTimeout(() => resolve(false), 5000);
  });
};

/**
 * Get product image with smart fallback
 * @param {Object} product - Product object
 * @param {number} index - Image index (default: 0 for primary image)
 * @returns {string} - Image URL (with fallback if needed)
 */
export const getProductImage = (product, index = 0) => {
  if (!product) {
    return categoryPlaceholders.electronics;
  }

  const category = product.category || 'electronics';

  // If product is marked to use placeholder, return it immediately
  if (product._usePlaceholder) {
    return categoryPlaceholders[category] || categoryPlaceholders.electronics;
  }

  // Priority: images array > thumbnail > placeholder
  let imageUrl = null;

  // Try to get from images array first
  if (Array.isArray(product.images) && product.images.length > 0) {
    imageUrl = product.images[index] || product.images[0];
  }

  // If no image from array, try thumbnail
  if (!imageUrl && product.thumbnail) {
    imageUrl = product.thumbnail;
  }

  // Validate the URL
  if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
    return categoryPlaceholders[category] || categoryPlaceholders.electronics;
  }

  return imageUrl;
};

/**
 * Get all product images with fallbacks
 * @param {Object} product - Product object
 * @returns {string[]} - Array of image URLs
 */
export const getProductImages = (product) => {
  if (!hasValidImage(product)) {
    return [categoryPlaceholders[product.category] || categoryPlaceholders.electronics];
  }

  return product.images.map((img) => {
    if (!img) {
      return categoryPlaceholders[product.category] || categoryPlaceholders.electronics;
    }
    return img;
  });
};

/**
 * Get category placeholder image
 * @param {string} category - Category name
 * @returns {string} - Placeholder image URL
 */
export const getCategoryPlaceholder = (category) => {
  return categoryPlaceholders[category] || categoryPlaceholders.electronics;
};

