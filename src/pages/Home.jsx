import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import DealsStrip from '../components/home/DealsStrip';
import CategoryQuickAccess from '../components/home/CategoryQuickAccess';
import ProductRail from '../components/home/ProductRail';
import BrandStrip from '../components/home/BrandStrip';
import PromoBanners from '../components/home/PromoBanners';

const HomePage = () => (
  <div className="space-y-6 bg-gray-50 pb-16 pt-2 sm:pt-4 md:pt-6">
    <HeroSlider />
    <DealsStrip />
    <CategoryQuickAccess />
    <ProductRail
      title="Top Selling Products"
      subtitle="Powered by customer demand"
      filter={(product) => product.reviewCount > 150}
    />
    <ProductRail
      title="Phones & Tablets"
      subtitle="Latest smartphones and tablets"
      filter={(product) => product.category === 'phones-tablets'}
    />
    <PromoBanners />
    <ProductRail
      title="New Arrivals"
      subtitle="Fresh drops every week"
      filter={(product) => product.isNewArrival}
    />
    <BrandStrip />
    <ProductRail
      title="Recommended For You"
      subtitle="Hand-picked from trending categories"
      filter={(product) => product.isFeatured}
    />
  </div>
);

export default HomePage;

