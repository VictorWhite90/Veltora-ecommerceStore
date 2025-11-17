// src/components/layout/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp } from 'lucide-react';
import { getAllProductsData } from '../../data/products';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getAllProductsData();
        setAllProducts(products);
      } catch (error) {
        console.error('Error loading products for search:', error);
      }
    };
    loadProducts();
  }, []);

  // Mock trending searches
  const trendingSearches = [
    'iPhone',
    'Laptop',
    'T-Shirt',
    'Headphones',
    'Shoes',
  ];

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Real search suggestions from products
  useEffect(() => {
    if (query.length > 1 && allProducts.length > 0) {
      setIsLoading(true);
      // Debounce search
      const timer = setTimeout(() => {
        const searchTerm = query.toLowerCase().trim();
        const filtered = allProducts
          .filter((product) => {
            const titleMatch = product.title?.toLowerCase().includes(searchTerm);
            const categoryMatch = product.category?.toLowerCase().includes(searchTerm);
            const brandMatch = product.brand?.toLowerCase().includes(searchTerm);
            return titleMatch || categoryMatch || brandMatch;
          })
          .slice(0, 8) // Limit to 8 suggestions
          .map((product) => ({
            id: product.id,
            title: product.title,
            category: product.category,
          }));
        
        setSuggestions(filtered);
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [query, allProducts]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      onClose?.();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
    if (e.key === 'Escape') {
      onClose?.();
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <Motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search for products..."
              className="w-full pl-12 pr-12 py-4 text-lg outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="p-4 text-center">
                <div className="inline-block w-6 h-6 border-2 border-navy-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Suggestions */}
            {!isLoading && suggestions.length > 0 && (
              <div className="py-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Suggestions
                </p>
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSearch(item.title)}
                    className="w-full px-4 py-3 hover:bg-gray-50 flex items-center justify-between transition-colors text-left"
                  >
                    <div>
                      <p className="text-gray-900 font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <Search className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && query.length > 1 && suggestions.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No products found for "{query}"</p>
                <button
                  onClick={() => handleSearch(query)}
                  className="mt-4 text-sm font-semibold text-navy-600 hover:text-navy-700"
                >
                  Search anyway →
                </button>
              </div>
            )}

            {/* Trending Searches */}
            {!query && (
              <div className="py-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending Searches
                </p>
                {trendingSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSearch(search)}
                    className="w-full px-4 py-3 hover:bg-gray-50 flex items-center justify-between transition-colors text-left"
                  >
                    <span className="text-gray-700">{search}</span>
                    <Search className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer Tip */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Press <kbd className="px-2 py-1 bg-white rounded border border-gray-300">Enter</kbd> to search or{' '}
              <kbd className="px-2 py-1 bg-white rounded border border-gray-300">Esc</kbd> to close
            </p>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
};

export default SearchBar;