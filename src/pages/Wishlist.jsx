import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductCard from '../components/products/ProductCard';

const WishlistPage = () => {
  // Wishlist is managed through ProductCard component which uses the cart store
  // This page would need to fetch wishlist items from the store if we want to display them
  // For now, we'll show a placeholder since wishlist items are managed per-product

  return (
    <div className="bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <Breadcrumbs
          trail={[
            { label: 'Home', href: '/' },
            { label: 'Wishlist' },
          ]}
        />
        <div className="mt-10 rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4rem] text-gray-500">Coming Soon</p>
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Wishlist</h1>
          <p className="mt-2 text-gray-500">
            Your wishlist items will appear here. Use the heart icon on products to add them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
