// src/services/productData.js
import { manualProducts } from '../data/manualProducts';
import { validateProductImage } from '../utils/imageValidation';

// Category mapping from DummyJSON to our Jumia-style categories
const categoryMapping = {
  smartphones: 'phones-tablets',
  laptops: 'computing',
  fragrances: 'health-beauty',
  skincare: 'health-beauty',
  groceries: 'supermarket',
  'home-decoration': 'home-office',
  furniture: 'home-office',
  tops: 'fashion',
  'womens-dresses': 'fashion',
  'womens-shoes': 'fashion',
  'mens-shirts': 'fashion',
  'mens-shoes': 'fashion',
  'mens-watches': 'fashion',
  'womens-watches': 'fashion',
  'womens-bags': 'fashion',
  'womens-jewellery': 'fashion',
  sunglasses: 'fashion',
  automotive: 'electronics',
  motorcycle: 'electronics',
  lighting: 'home-office',
};

// Subcategory mapping
const subcategoryMapping = {
  smartphones: 'smartphones',
  laptops: 'laptops',
  fragrances: 'personal-care',
  skincare: 'skincare',
  groceries: 'groceries',
  'home-decoration': 'decor',
  furniture: 'furniture',
  tops: 'mens-fashion',
  'womens-dresses': 'womens-fashion',
  'womens-shoes': 'womens-fashion',
  'mens-shirts': 'mens-fashion',
  'mens-shoes': 'mens-fashion',
  'mens-watches': 'mens-fashion',
  'womens-watches': 'womens-fashion',
  'womens-bags': 'womens-fashion',
  'womens-jewellery': 'womens-fashion',
  sunglasses: 'mens-fashion',
  automotive: 'televisions',
  motorcycle: 'audio',
  lighting: 'decor',
};

const CACHE_KEY = 'veltora_products_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Transform DummyJSON product to our format
const transformProduct = (dummyProduct) => {
  const ourCategory = categoryMapping[dummyProduct.category] || 'electronics';
  const subcategory = subcategoryMapping[dummyProduct.category] || 'all';

  // Calculate discount if originalPrice exists
  const originalPrice = dummyProduct.price * 1.2; // Simulate original price
  const discount = Math.round(((originalPrice - dummyProduct.price) / originalPrice) * 100);

  // Ensure images array is always populated
  let images = [];
  
  // Handle null or array images
  if (dummyProduct.images !== null && Array.isArray(dummyProduct.images) && dummyProduct.images.length > 0) {
    images = dummyProduct.images.filter((img) => img && typeof img === 'string' && img.trim() !== '');
  }
  
  // If no images, use thumbnail
  if (images.length === 0 && dummyProduct.thumbnail) {
    images = [dummyProduct.thumbnail];
  }
  
  // If still no images, ensure we have at least an empty array (will use placeholder in component)
  if (images.length === 0) {
    images = [];
  }

  return {
    id: `dummy-${dummyProduct.id}`,
    title: dummyProduct.title,
    category: ourCategory,
    subcategory,
    brand: dummyProduct.brand || 'Generic',
    price: Math.round(dummyProduct.price),
    originalPrice: Math.round(originalPrice),
    discount: discount > 0 ? discount : 0,
    rating: Math.round(dummyProduct.rating * 10) / 10,
    reviewCount: dummyProduct.stock || Math.floor(Math.random() * 500) + 50,
    images,
    thumbnail: dummyProduct.thumbnail || images[0] || '',
    description: dummyProduct.description || '',
    inStock: dummyProduct.stock > 0,
    stockCount: dummyProduct.stock || Math.floor(Math.random() * 100),
    specifications: {
      brand: dummyProduct.brand,
      category: dummyProduct.category,
    },
    shipping: {
      cost: dummyProduct.price > 99 ? 0 : 5.99,
      freeShipping: dummyProduct.price > 99,
      estimatedDays: '3-5 days',
    },
    tags: [],
    isFeatured: dummyProduct.rating > 4.5,
    isNewArrival: Math.random() > 0.7,
      seller: 'Veltora Official',
  };
};

// Fetch products from DummyJSON API
const fetchDummyJSONProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=100');
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching DummyJSON products:', error);
    return [];
  }
};

// Validate and filter products
const validateProducts = (products) => {
  return products.map((product) => {
    const transformed = transformProduct(product);
    
    // Validate image matches category
    const validation = validateProductImage(transformed);
    
    // Smart fallback: if title doesn't match category, still include but mark for placeholder
    // titleMatchesCategory is a boolean, not a function
    if (!validation.titleMatchesCategory) {
      // Still include the product, but it will use placeholder on error
      transformed._usePlaceholder = true;
    }

    // Always include the product, even if no images (will use placeholder)
    return transformed;
  });
};

// Get cached products
const getCachedProducts = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid
    if (now - timestamp < CACHE_EXPIRY) {
      return data;
    }

    // Cache expired
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

// Cache products
const cacheProducts = (products) => {
  try {
    const cacheData = {
      data: products,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching products:', error);
  }
};

// Main function to get all products
export const getAllProducts = async (forceRefresh = false) => {
  // Check cache first
  if (!forceRefresh) {
    const cached = getCachedProducts();
    if (cached) {
      return cached;
    }
  }

  // Fetch from API
  const dummyProducts = await fetchDummyJSONProducts();
  const validatedProducts = validateProducts(dummyProducts);

  // Add manual products
  const allManualProducts = Object.values(manualProducts).flat();
  const allProducts = [...validatedProducts, ...allManualProducts];

  // Cache the results
  cacheProducts(allProducts);

  return allProducts;
};

// Get products by category
export const getProductsByCategory = async (category) => {
  const allProducts = await getAllProducts();
  return allProducts.filter((p) => p.category === category);
};

// Get single product by ID
export const getProductById = async (id) => {
  const allProducts = await getAllProducts();
  return allProducts.find((p) => p.id === id);
};

// Get featured products
export const getFeaturedProducts = async (limit = 20) => {
  const allProducts = await getAllProducts();
  return allProducts.filter((p) => p.isFeatured).slice(0, limit);
};

// Get new arrivals
export const getNewArrivals = async (limit = 20) => {
  const allProducts = await getAllProducts();
  return allProducts.filter((p) => p.isNewArrival).slice(0, limit);
};

// Clear cache (useful for testing)
export const clearProductCache = () => {
  localStorage.removeItem(CACHE_KEY);
};

