import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductCard from '../components/products/ProductCard';
import { getAllProductsData } from '../data/products';
import { SkeletonGrid } from '../components/common/SkeletonCard';
import { Search } from 'lucide-react';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getAllProductsData();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (query && products.length > 0) {
      const searchTerm = query.toLowerCase().trim();
      const filtered = products.filter((product) => {
        const titleMatch = product.title?.toLowerCase().includes(searchTerm);
        const categoryMatch = product.category?.toLowerCase().includes(searchTerm);
        const brandMatch = product.brand?.toLowerCase().includes(searchTerm);
        const descriptionMatch = product.description?.toLowerCase().includes(searchTerm);
        
        return titleMatch || categoryMatch || brandMatch || descriptionMatch;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  return (
    <div className="bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumbs
          trail={[
            { label: 'Home', href: '/' },
            { label: `Search: ${query || 'All Products'}` },
          ]}
        />

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <Search className="h-6 w-6 text-navy-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {query ? `Search Results for "${query}"` : 'All Products'}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {loading
                  ? 'Loading...'
                  : `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          {loading ? (
            <SkeletonGrid count={8} />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-lg font-semibold text-gray-900">
                No products found for "{query}"
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Try searching with different keywords or browse our categories
              </p>
              <Link
                to="/"
                className="mt-6 inline-block rounded-full bg-navy-600 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-700 transition-colors"
              >
                Browse All Categories
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;

