import React from 'react';
import { promoBanners } from '../../data/banners';

const PromoBanners = () => (
  <section className="grid gap-4 lg:grid-cols-2">
    {promoBanners.map((banner) => (
      <div
        key={banner.id}
        className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg"
      >
        <div className="grid gap-4 p-6 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Special
            </p>
            <h3 className="text-2xl font-bold text-gray-900">{banner.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{banner.description}</p>
            <button className="mt-4 text-sm font-semibold text-navy-600 hover:text-navy-700">
              Learn more →
            </button>
          </div>
          <div className="rounded-2xl bg-gray-50 p-4">
            <img
              src={banner.image}
              alt={banner.title}
              className="h-40 w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    ))}
  </section>
);

export default PromoBanners;

