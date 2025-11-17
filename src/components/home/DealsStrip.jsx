import React, { useEffect, useState } from 'react';
import { Clock, Flame, Sparkles } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { getAllProductsData } from '../../data/products';
import { SkeletonGrid } from '../common/SkeletonCard';

const targetDate = new Date(Date.now() + 1000 * 60 * 60 * 6); // 6 hours

const formatTime = (time) => time.toString().padStart(2, '0');

const DealsStrip = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await getAllProductsData();
        // Filter products with discounts and sort by discount
        const deals = allProducts
          .filter((p) => p.discount > 0)
          .sort((a, b) => b.discount - a.discount)
          .slice(0, 8);
        setProducts(deals);
      } catch (error) {
        console.error('Error loading deals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(targetDate - Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.max(Math.floor(timeLeft / (1000 * 60 * 60)), 0);
  const minutes = Math.max(Math.floor((timeLeft / (1000 * 60)) % 60), 0);
  const seconds = Math.max(Math.floor((timeLeft / 1000) % 60), 0);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-red-600">
            <Flame className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-widest">
              Flash Sales
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Deals ending soon</h2>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-gray-100 px-4 py-2">
          <Clock className="h-5 w-5 text-gray-700" />
          <div className="flex items-center gap-1 font-mono text-lg font-semibold text-gray-900">
            <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:
            <span>{formatTime(seconds)}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <SkeletonGrid count={4} />
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{ ...product, discount: product.discount || 25 }}
              />
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700">
            See all deals <Sparkles className="h-4 w-4" />
          </button>
        </>
      ) : (
        <div className="py-12 text-center text-gray-500">No deals available</div>
      )}
    </section>
  );
};

export default DealsStrip;

