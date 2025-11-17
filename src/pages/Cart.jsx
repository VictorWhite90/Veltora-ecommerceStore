import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useCartStore } from '../store/cartStore';
import { getProductImage } from '../utils/imageValidation';
import { Trash2, Minus, Plus } from 'lucide-react';
import Button from '../components/common/Button';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  const subtotal = getCartTotal();
  const shipping = subtotal > 99 ? 0 : 10;
  const vat = subtotal * 0.075;
  const total = subtotal + shipping + vat;

  return (
    <div className="bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <Breadcrumbs
          trail={[
            { label: 'Home', href: '/' },
            { label: 'Cart' },
          ]}
        />

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <p className="text-2xl font-bold text-gray-900">Your cart is empty</p>
            <p className="mt-2 text-gray-500">Browse categories to add premium products.</p>
            <Link to="/">
              <Button className="mt-6">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                >
                  <img
                    src={getProductImage(item)}
                    alt={item.title}
                    className="h-32 w-32 rounded-2xl border border-gray-100 bg-gray-50 object-contain"
                    onError={(e) => {
                      e.target.src = getProductImage(item);
                    }}
                  />
                  <div className="flex-1 space-y-2">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-navy-600"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-500">Sold by {item.seller}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="rounded-full border border-gray-200 p-1 hover:bg-gray-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-gray-900">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="rounded-full border border-gray-200 p-1 hover:bg-gray-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(item.price * (item.quantity || 1))}
                      </span>
                      <span className={`text-xs ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 self-start text-sm font-semibold text-gray-500 sm:self-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="sticky top-28 h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (7.5%)</span>
                  <span>{formatCurrency(vat)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm"
                />
                <Link to="/checkout">
                  <Button fullWidth>Proceed to Checkout</Button>
                </Link>
                <Link to="/">
                  <button className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
