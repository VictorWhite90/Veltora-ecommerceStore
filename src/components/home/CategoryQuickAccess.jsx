import React from 'react';
import { mainCategories } from '../../data/categories';
import {
  AirVent,
  Smartphone,
  HeartPulse,
  Home,
  Tv,
  Shirt,
  ShoppingBasket,
  Laptop,
  Baby,
  Gamepad,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  AirVent,
  Smartphone,
  HeartPulse,
  Home,
  Tv,
  Shirt,
  ShoppingBasket,
  Laptop,
  Baby,
  Gamepad,
};

const CategoryQuickAccess = () => {
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Shop by Category
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            Curated collections inspired by Jumia & Amazon
          </h2>
        </div>
        <button
          className="text-sm font-semibold text-red-600 hover:text-red-700"
          onClick={() => navigate('/categories')}
        >
          View all categories
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {mainCategories.map((category) => {
          const Icon = iconMap[category.icon] || ShoppingBasket;
          return (
            <button
              key={category.id}
              onClick={() => navigate(`/category/${category.id}`)}
              className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-4 text-left transition-all hover:-translate-y-1 hover:border-red-600 hover:bg-white hover:shadow-xl"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-red-600 shadow"
                style={{ color: category.accent }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{category.name}</p>
                <p className="text-sm text-gray-500">
                  {category.subcategories.map((sub) => sub.name).slice(0, 2).join(', ')}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryQuickAccess;

