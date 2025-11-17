// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar, Footer } from './components/layout';
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import ProductDetailPage from './pages/ProductDetail';
import CartPage from './pages/Cart';
import WishlistPage from './pages/Wishlist';
import CheckoutPage from './pages/Checkout';
import SearchResultsPage from './pages/SearchResults';

const PlaceholderPage = ({ title }) => (
  <div className="bg-gray-50 py-20">
    <div className="mx-auto max-w-5xl rounded-3xl bg-white p-12 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.4rem] text-gray-500">Coming Soon</p>
      <h1 className="mt-4 text-4xl font-bold text-gray-900">{title}</h1>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 pt-[140px] sm:pt-[160px] md:pt-[220px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/products" element={<SearchResultsPage />} />
            <Route path="/login" element={<PlaceholderPage title="Login Experience" />} />
            <Route path="/register" element={<PlaceholderPage title="Create Account" />} />
            <Route path="/dashboard/*" element={<PlaceholderPage title="Account Dashboard" />} />
            <Route path="*" element={<PlaceholderPage title="" />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;