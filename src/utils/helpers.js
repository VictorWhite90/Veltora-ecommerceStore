// src/utils/constants.js

// API Configuration
export const API_BASE_URL = 'https://fakestoreapi.com';

// Pagination
export const PRODUCTS_PER_PAGE = 12;

// Product Categories
export const CATEGORIES = [
  { id: 'all', name: 'All Products', slug: 'all' },
  { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  { id: 'jewelery', name: 'Jewelry', slug: 'jewelery' },
  { id: 'men\'s clothing', name: 'Men\'s Clothing', slug: 'mens-clothing' },
  { id: 'women\'s clothing', name: 'Women\'s Clothing', slug: 'womens-clothing' },
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'rating-desc', label: 'Highest Rated' },
];

// Price Ranges
export const PRICE_RANGES = [
  { min: 0, max: 50, label: 'Under $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 200, label: '$100 - $200' },
  { min: 200, max: 500, label: '$200 - $500' },
  { min: 500, max: Infinity, label: 'Over $500' },
];

// Rating Filters
export const RATING_FILTERS = [
  { value: 4, label: '4 Stars & Up' },
  { value: 3, label: '3 Stars & Up' },
  { value: 2, label: '2 Stars & Up' },
];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Toast Configuration
export const TOAST_CONFIG = {
  duration: 3000,
  position: 'top-center',
  style: {
    background: '#1f2937',
    color: '#fff',
    borderRadius: '0.75rem',
  },
};