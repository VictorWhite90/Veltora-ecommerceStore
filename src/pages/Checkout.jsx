import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useCartStore } from '../store/cartStore';
import { CreditCard, Lock, MapPin, Phone, Mail } from 'lucide-react';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const CheckoutPage = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'card',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 99 ? 0 : 10;
  const vat = subtotal * 0.075;
  const total = subtotal + shipping + vat;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success('Order placed successfully!');
    clearCart();
    setIsProcessing(false);
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs
            trail={[
              { label: 'Home', href: '/' },
              { label: 'Cart', href: '/cart' },
              { label: 'Checkout' },
            ]}
          />
          <div className="mt-10 rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <p className="text-2xl font-bold text-gray-900">Your cart is empty</p>
            <p className="mt-2 text-gray-500">Add items to your cart before checkout.</p>
            <Button className="mt-6" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <Breadcrumbs
          trail={[
            { label: 'Home', href: '/' },
            { label: 'Cart', href: '/cart' },
            { label: 'Checkout' },
          ]}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      <Mail className="mr-2 inline h-4 w-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      <Phone className="mr-2 inline h-4 w-4" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <MapPin className="h-5 w-5 text-red-600" />
                Delivery Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <CreditCard className="h-5 w-5 text-red-600" />
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-red-600 bg-red-50 p-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-red-600"
                  />
                  <CreditCard className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-gray-900">Credit/Debit Card</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 p-4 hover:border-red-600">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-red-600"
                  />
                  <span className="font-semibold text-gray-900">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <aside className="sticky top-28 h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>

            {/* Items List */}
            <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <img
                    src={item.images?.[0] || item.thumbnail}
                    alt={item.title}
                    className="h-16 w-16 rounded-xl border border-gray-100 bg-gray-50 object-contain"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 line-clamp-1">{item.title}</p>
                    <p className="text-gray-500">
                      Qty: {item.quantity || 1} × {formatCurrency(item.price)}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(item.price * (item.quantity || 1))}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-3 text-sm text-gray-600">
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
                <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6">
                <Button
                  type="submit"
                  fullWidth
                  loading={isProcessing}
                  disabled={isProcessing}
                  className="flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
              </form>

              <p className="mt-4 text-center text-xs text-gray-500">
                Your payment information is secure and encrypted
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

