import React from 'react';
import { featuredBrands } from '../../data/brands';

const BrandStrip = () => (
  <section className="rounded-3xl bg-white p-6 shadow-lg">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          Shop by brand
        </p>
        <h2 className="text-2xl font-bold text-gray-900">Official partner stores</h2>
      </div>
      <button className="text-sm font-semibold text-navy-600 hover:text-navy-700">
        View brand directory
      </button>
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
      {featuredBrands.map((brand) => (
        <button
          key={brand.id}
          className="group flex h-24 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-navy-600 hover:bg-white hover:shadow-lg"
        >
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="max-h-10 grayscale transition group-hover:grayscale-0"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  </section>
);

export default BrandStrip;

