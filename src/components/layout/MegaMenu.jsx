import React from 'react';
import { Link } from 'react-router-dom';
import { mainCategories } from '../../data/categories';
import { ShoppingBag, Tag, Sparkles } from 'lucide-react';

const featuredDeals = [
  { title: 'Elite Friday Deals', description: 'Up to 60% off + next-day delivery', href: '/deals/flash' },
];

const MegaMenu = ({ activeCategory }) => {
  const category = mainCategories.find((cat) => cat.id === activeCategory) || mainCategories[0];

  return (
    <div className="grid gap-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50">
            <ShoppingBag className="h-6 w-6 text-navy-600" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              {category.name}
            </p>
            <p className="text-base text-gray-600">{category.description}</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {category.subcategories.map((sub) => (
            <div key={sub.id} className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
              <p className="text-sm font-semibold text-gray-900">{sub.name}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
                {sub.items.map((item) => (
                  <Link
                    key={item}
                    to={`/category/${category.id}?sub=${sub.id}&q=${encodeURIComponent(item)}`}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:text-navy-600"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-6">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Featured deals</p>
          <div className="mt-3 space-y-3">
            {featuredDeals.map((deal) => (
              <Link
                key={deal.title}
                to={deal.href}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 p-3 text-left transition hover:border-navy-600"
              >
                <Tag className="h-4 w-4 text-navy-600" />
                <div>
                  <p className="font-semibold text-gray-900">{deal.title}</p>
                  <p className="text-xs text-gray-500">{deal.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-navy-600 to-navy-500 p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
            <Sparkles className="h-4 w-4" />
            Quick Links
          </div>
          <div className="mt-4 space-y-2 text-sm">
            {['Top deals of the day', 'Same-day delivery items', 'Premium collections'].map((item) => (
              <Link key={item} to="/deals" className="block text-white/90 hover:text-white">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;

