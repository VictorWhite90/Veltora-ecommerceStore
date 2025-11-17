import React from 'react';
import { ChevronDown, Star } from 'lucide-react';

const ratings = [5, 4, 3, 2];
const availability = [
  { label: 'In Stock', value: 'in-stock' },
  { label: 'Out of Stock', value: 'out-of-stock' },
];

const colors = ['#111111', '#c1121f', '#1e293b', '#f59e0b', '#0ea5e9', '#22c55e'];

const FilterGroup = ({ title, children }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
    <button className="flex w-full items-center justify-between text-left text-sm font-semibold text-gray-900">
      {title}
      <ChevronDown className="h-4 w-4 text-gray-400" />
    </button>
    <div className="mt-3 space-y-3 text-sm text-gray-700">{children}</div>
  </div>
);

const FilterSidebar = ({ category, subcategories }) => (
  <aside className="sticky top-28 flex h-fit flex-col gap-4">
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        Filters for
      </p>
      <p className="text-base font-bold text-gray-900">{category.name}</p>
    </div>
    <FilterGroup title="Category">
      {subcategories.map((sub) => (
        <label key={sub.id} className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" className="rounded border-gray-300 text-navy-600 focus:ring-navy-500" />
          <span>{sub.name}</span>
        </label>
      ))}
    </FilterGroup>

    <FilterGroup title="Price Range">
      <div className="flex items-center gap-3">
        <input
          type="number"
          placeholder="Min"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
        <span className="text-gray-400">-</span>
        <input
          type="number"
          placeholder="Max"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
      </div>
      <input type="range" min="0" max="5000" className="w-full accent-navy-600" />
    </FilterGroup>

    <FilterGroup title="Brand">
      {['Samsung', 'Apple', 'LG', 'Sony', 'HP'].map((brand) => (
        <label key={brand} className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" className="rounded border-gray-300 text-navy-600 focus:ring-navy-500" />
          <span>{brand}</span>
        </label>
      ))}
      <button className="text-sm font-semibold text-navy-600">View more</button>
    </FilterGroup>

    <FilterGroup title="Ratings">
      {ratings.map((value) => (
        <label key={value} className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" className="rounded border-gray-300 text-navy-600 focus:ring-navy-500" />
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-900">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-3.5 w-3.5 ${index < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span>& Up</span>
        </label>
      ))}
    </FilterGroup>

    <FilterGroup title="Availability">
      {availability.map((option) => (
        <label key={option.value} className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" className="rounded border-gray-300 text-navy-600 focus:ring-navy-500" />
          <span>{option.label}</span>
        </label>
      ))}
    </FilterGroup>

    <FilterGroup title="Colors">
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color}
            className="h-8 w-8 rounded-full border-2 border-white shadow focus:outline-none"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </FilterGroup>

    <div className="flex gap-3">
      <button className="flex-1 rounded-full border border-gray-300 py-2 text-sm font-semibold text-gray-700">
        Clear All
      </button>
      <button className="flex-1 rounded-full bg-navy-600 py-2 text-sm font-semibold text-white">
        Apply
      </button>
    </div>
  </aside>
);

export default FilterSidebar;

