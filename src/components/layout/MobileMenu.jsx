// src/components/layout/MobileMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Home,
  ShoppingBag,
  Heart,
  User,
  Package,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { mainCategories } from '../../data/categories';
import { useCartStore } from '../../store/cartStore';

const MobileMenu = ({ isOpen, onClose }) => {
  // Mock auth state - replace with Zustand
  const isAuthenticated = false;
  const user = { name: 'John Doe', email: 'john@example.com' };
  const wishlistCount = useCartStore((state) => state.getWishlistCount());

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist', badge: wishlistCount },
    { icon: Package, label: 'Orders', path: '/dashboard/orders', authRequired: true },
    { icon: User, label: 'Profile', path: '/dashboard', authRequired: true },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings', authRequired: true },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <Motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* User Section */}
            {isAuthenticated ? (
              <div className="p-6 bg-gradient-to-r from-navy-600 to-navy-700 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-navy-200">{user.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-3">
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="block w-full py-3 bg-navy-600 hover:bg-navy-700 text-white text-center font-medium rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleLinkClick}
                  className="block w-full py-3 border-2 border-navy-600 text-navy-600 text-center font-medium rounded-lg hover:bg-navy-50 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto py-4 overscroll-contain">
              {menuItems.map((item) => {
                // Skip auth-required items if not authenticated
                if (item.authRequired && !isAuthenticated) return null;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={`w-5 h-5 transition-colors ${
                        item.label === 'Wishlist' 
                          ? 'text-red-600' 
                          : 'text-gray-500 group-hover:text-red-600'
                      }`} />
                      <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && item.badge > 0 && (
                        <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                    </div>
                  </Link>
                );
              })}

              {/* Categories Section */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="px-6 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                    Categories
                  </p>
                </div>
                {mainCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                      {category.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-navy-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </nav>

            {/* Logout Button (if authenticated) */}
            {isAuthenticated && (
              <div className="p-6 border-t border-gray-100">
                <button
                  onClick={() => {
                    console.log('Logout');
                    handleLinkClick();
                  }}
                  className="flex items-center justify-center space-x-2 w-full py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* App Version */}
            <div className="p-4 text-center">
              <p className="text-xs text-gray-400">Veltora v1.0.0</p>
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;