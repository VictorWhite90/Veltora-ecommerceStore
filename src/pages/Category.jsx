import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import FilterSidebar from '../components/category/FilterSidebar';
import ProductCard from '../components/products/ProductCard';
import { mainCategories } from '../data/categories';
import { getProductsByCategoryData } from '../data/products';
import { SkeletonGrid } from '../components/common/SkeletonCard';
import { ChevronDown, LayoutGrid, Rows3 } from 'lucide-react';

const CategoryPage = () => {
  const { categoryId = 'appliances' } = useParams();
  const category = mainCategories.find((cat) => cat.id === categoryId) || mainCategories[0];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const categoryProducts = await getProductsByCategoryData(category.id);
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error loading category products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category.id]);

  return (
    <div className="bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumbs
          trail={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: category.name },
          ]}
        />

        <header className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                {category.name}
              </p>
              <h1 className="text-3xl font-bold text-gray-900">{category.description}</h1>
              <p className="mt-2 text-sm text-gray-500">
                Discover curated collections with Amazon-level merchandising quality.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              {loading ? 'Loading...' : `Showing 1-${products.length} of ${products.length} products`}
            </div>
          </div>
        </header>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-1/4">
            <FilterSidebar category={category} subcategories={category.subcategories} />
          </div>

          <div className="lg:w-3/4">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Sort by:</span>
                <button className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5">
                  Relevance <ChevronDown className="h-4 w-4" />
                </button>
                <button className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5">
                  Price <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-gray-500">
                <LayoutGrid className="h-4 w-4 text-navy-600" />
                <Rows3 className="h-4 w-4" />
              </div>
            </div>

            {loading ? (
              <SkeletonGrid count={6} />
            ) : products.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-6 py-12 text-center text-gray-500">No products found in this category</div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <button className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-600">
                  Previous
                </button>
                <button className="rounded-full bg-navy-600 px-4 py-2 font-semibold text-white">1</button>
                <button className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-600">
                  2
                </button>
                <button className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-600">
                  Next
                </button>
              </div>
              <button className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-600">
                Load more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

