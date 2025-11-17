import React, { useState, useEffect } from 'react';
import ProductCard from '../products/ProductCard';
import { getAllProductsData } from '../../data/products';
import { SkeletonGrid } from '../common/SkeletonCard';

const ProductRail = ({ title, subtitle, filter }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
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

  const filtered = products.filter(filter || (() => true)).slice(0, 8);

  if (loading) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              {subtitle}
            </p>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
        </div>
        <SkeletonGrid count={4} />
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            {subtitle}
          </p>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <button className="text-sm font-semibold text-navy-600 hover:text-navy-700">
          See all
        </button>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-gray-500">No products found</div>
      )}
    </section>
  );
};

export default ProductRail;

