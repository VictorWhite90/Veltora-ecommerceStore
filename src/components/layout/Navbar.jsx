// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  Search,
  LogOut,
  Package,
  Settings,
  MapPin,
  ChevronDown,
  Truck,
  BellRing,
} from 'lucide-react';
import Button from '../common/Button';
import SearchBar from './SearchBar';
import MegaMenu from './MegaMenu';
import { mainCategories } from '../../data/categories';
import { useCartStore } from '../../store/cartStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(mainCategories[0].id);
  const navigate = useNavigate();

  const isAuthenticated = false;
  const cartItemsCount = useCartStore((state) => state.getCartCount());
  const wishlistCount = useCartStore((state) => state.getWishlistCount());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Flash Sales', path: '/deals' },
    { name: 'Customer Service', path: '/help' },
  ];

  const categoryNavItems = mainCategories.slice(0, 6);

  return (
    <Motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-md' : 'bg-white'
      }`}
    >
      {/* Top utility bar */}
      <div className="hidden border-b border-gray-100 bg-gray-50 py-2 text-xs text-gray-600 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 font-semibold text-gray-700">
              <MapPin className="h-4 w-4 text-navy-600" />
              Deliver to Lagos, NG
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center gap-2 text-gray-500">
              <Truck className="h-4 w-4 text-navy-600" />
              Free delivery over $99 | Easy returns
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/track-order" className="hover:text-navy-600">
              Track Order
            </Link>
            <Link to="/sell-on-elite" className="hover:text-navy-600">
              Sell on Elite
            </Link>
            <Link to="/help" className="hover:text-navy-600">
              Help Center
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Primary row */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-600 text-2xl font-black text-white">
              V
            </div>
            <div>
              <p className="text-xl font-black text-gray-900">Veltora</p>
              <p className="text-[8px] font-semibold uppercase tracking-[0.2rem] text-red-500">
                Everything You Need, Elevated
              </p>
            </div>
          </Link>

          <div className="hidden flex-1 px-8 md:block">
            <div
              className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 shadow-sm"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products, brands and categories"
                className="w-full bg-transparent text-sm text-gray-700 outline-none"
                readOnly
              />
              <kbd className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-500">
                /
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="rounded-full border border-gray-100 bg-white p-2 shadow-sm md:hidden"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button className="hidden rounded-full border border-gray-100 bg-white p-2 shadow-sm md:flex">
              <BellRing className="h-5 w-5 text-gray-500" />
            </button>
            <Link
              to="/wishlist"
              className="relative rounded-full border border-gray-100 bg-white p-2 shadow-sm"
            >
              <Heart className="h-5 w-5 text-gray-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative rounded-full border border-gray-100 bg-white p-2 shadow-sm"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy-600 text-[10px] font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-2 shadow-sm"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <Motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl"
                    >
                      <p className="text-sm font-semibold text-gray-900">Hey, Victor 👋</p>
                      <p className="text-xs text-gray-500">victorwhite590@gmail.com</p>
                      <div className="mt-4 space-y-2 text-sm text-gray-700">
                        <Link to="/dashboard" className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-50">
                          <User className="h-4 w-4 text-gray-400" />
                          Profile overview
                        </Link>
                        <Link to="/dashboard/orders" className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-50">
                          <Package className="h-4 w-4 text-gray-400" />
                          Orders & Returns
                        </Link>
                        <Link to="/dashboard/settings" className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-50">
                          <Settings className="h-4 w-4 text-gray-400" />
                          Account settings
                        </Link>
                      </div>
                      <button className="mt-3 flex w-full items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden items-center gap-3 md:flex">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Create account
                </Button>
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="rounded-full border border-gray-100 bg-white p-2 shadow-sm md:hidden"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Secondary nav - Hidden on mobile */}
        <div className="hidden md:flex flex-wrap items-center gap-4 border-t border-gray-100 py-3">
          <div
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button
              onClick={() => setIsMegaMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full bg-navy-600 px-4 py-2 text-sm font-semibold text-white shadow"
            >
              <Menu className="h-4 w-4" />
              All Categories
              <ChevronDown className="h-4 w-4" />
            </button>

            <AnimatePresence>
              {isMegaMenuOpen && (
                <Motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-14 w-[80vw] max-w-5xl"
                >
                  <MegaMenu activeCategory={activeCategory} />
                </Motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-1 flex-wrap items-center gap-2 overflow-x-auto text-sm text-gray-600">
            {categoryNavItems.map((category) => (
              <button
                key={category.id}
                onMouseEnter={() => {
                  setActiveCategory(category.id);
                  if (isMegaMenuOpen) return;
                }}
                onClick={() => {
                  setActiveCategory(category.id);
                  setIsMegaMenuOpen(true);
                }}
                className={`rounded-full px-3 py-1.5 font-semibold transition ${
                  activeCategory === category.id
                    ? 'bg-gray-100 text-navy-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="hidden gap-4 text-sm font-semibold text-gray-600 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="hover:text-navy-600">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile search trigger */}
      <div className="border-t border-gray-100 bg-white px-4 py-2 md:hidden">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2"
        >
          <Search className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">Search products</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 bg-white md:hidden"
          >
            <div className="space-y-2 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-2xl bg-gray-50 px-4 py-3 font-semibold text-gray-700"
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="space-y-2">
                  <Button fullWidth variant="outline" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button fullWidth onClick={() => navigate('/register')}>
                    Register
                  </Button>
                </div>
              )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}</AnimatePresence>
    </Motion.header>
  );
};

export default Navbar;