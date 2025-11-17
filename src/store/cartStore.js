// src/store/cartStore.js
import { create } from 'zustand';

// Load from localStorage
const loadCart = () => {
  try {
    const stored = localStorage.getItem('veltora-cart');
    return stored ? JSON.parse(stored) : { items: [], wishlist: [] };
  } catch {
    return { items: [], wishlist: [] };
  }
};

// Save to localStorage
const saveCart = (items, wishlist) => {
  try {
    localStorage.setItem('veltora-cart', JSON.stringify({ items, wishlist }));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

const initialState = loadCart();

export const useCartStore = create((set, get) => ({
  items: initialState.items || [],
  wishlist: initialState.wishlist || [],

  // Cart actions
  addToCart: (product) => {
    const items = get().items;
    const existingItem = items.find((item) => item.id === product.id);

    let newItems;
    if (existingItem) {
      newItems = items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...items, { ...product, quantity: 1 }];
    }

    set({ items: newItems });
    saveCart(newItems, get().wishlist);
  },

  removeFromCart: (productId) => {
    const newItems = get().items.filter((item) => item.id !== productId);
    set({ items: newItems });
    saveCart(newItems, get().wishlist);
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    const newItems = get().items.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    set({ items: newItems });
    saveCart(newItems, get().wishlist);
  },

  clearCart: () => {
    set({ items: [] });
    saveCart([], get().wishlist);
  },

  getCartCount: () => {
    return get().items.reduce((total, item) => total + (item.quantity || 1), 0);
  },

  getCartTotal: () => {
    return get().items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  },

  // Wishlist actions
  toggleWishlist: (product) => {
    const wishlist = get().wishlist;
    const exists = wishlist.find((item) => item.id === product.id);

    let newWishlist;
    if (exists) {
      newWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      newWishlist = [...wishlist, product];
    }

    set({ wishlist: newWishlist });
    saveCart(get().items, newWishlist);
  },

  isInWishlist: (productId) => {
    return get().wishlist.some((item) => item.id === productId);
  },

  getWishlistCount: () => {
    return get().wishlist.length;
  },
}));

