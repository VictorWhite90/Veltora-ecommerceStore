import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { getProductByIdData } from '../data/products';
import { getProductImage, getProductImages } from '../utils/imageValidation';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Share2,
  Heart,
  ShoppingCart,
  Zap,
} from 'lucide-react';
import Button from '../components/common/Button';
import ProductCard from '../components/products/ProductCard';
import SkeletonCard from '../components/common/SkeletonCard';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const isInWishlist = useCartStore((state) => state.isInWishlist(product?.id));

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductByIdData(productId);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-2xl font-bold text-gray-900">Product not found</p>
          <Button className="mt-4" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const images = getProductImages(product);
  const mainImage = images[selectedImageIndex] || getProductImage(product);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${product.title} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <Breadcrumbs
          trail={[
            { label: 'Home', href: '/' },
            { label: product.category, href: `/category/${product.category}` },
            { label: product.title },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="relative overflow-hidden rounded-2xl bg-gray-50">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full object-contain"
                onError={(e) => {
                  e.target.src = getProductImage(product);
                }}
              />
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.slice(0, 5).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`rounded-2xl border ${
                      index === selectedImageIndex
                        ? 'border-red-600'
                        : 'border-gray-200'
                    } bg-gray-50 p-2`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index}`}
                      className="h-16 w-full object-contain"
                      onError={(e) => {
                        e.target.src = getProductImage(product);
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Premium Store
              </p>
              <button className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="mt-1 text-sm text-gray-500">Sold by {product.seller}</p>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">{product.rating}</span>
              <span>({product.reviewCount?.toLocaleString()} reviews)</span>
            </div>

            <div className="mt-5 rounded-2xl bg-gray-50 p-4">
              <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </p>
                {product.originalPrice > product.price && (
                  <>
                    <p className="text-base text-gray-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </p>
                    <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
              {product.originalPrice > product.price && (
                <p className="mt-2 text-sm text-gray-600">
                  You save {formatCurrency(product.originalPrice - product.price)}
                </p>
              )}
            </div>

            <div className="mt-5 space-y-3">
              {product.variations?.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-900">Variations</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {product.variations.map((variation) => (
                      <button
                        key={variation.value}
                        className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-red-600 hover:text-red-600"
                      >
                        {variation.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-lg font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  +
                </button>
                <p
                  className={`text-sm font-semibold ${
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  icon={ShoppingCart}
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  icon={Zap}
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
                <button
                  onClick={handleToggleWishlist}
                  className={`rounded-full border border-gray-200 p-3 transition ${
                    isInWishlist ? 'text-red-600' : 'text-gray-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 text-sm text-gray-600 lg:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3">
                <Truck className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">Fast Delivery</p>
                  <p>{product.shipping?.estimatedDays || '3-5 days'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3">
                <ShieldCheck className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">Warranty</p>
                  <p>Manufacturer warranty included</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3">
                <RotateCcw className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">Return Policy</p>
                  <p>15 days free returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 space-y-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex gap-4 border-b border-gray-100 pb-4 text-sm font-semibold text-gray-500">
            <button className="rounded-full bg-gray-100 px-4 py-2 text-gray-900">
              Description
            </button>
            <button className="rounded-full px-4 py-2 hover:bg-gray-50">Specifications</button>
            <button className="rounded-full px-4 py-2 hover:bg-gray-50">Reviews</button>
            <button className="rounded-full px-4 py-2 hover:bg-gray-50">Q & A</button>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
          {product.specifications && (
            <div className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between rounded-2xl bg-gray-50 px-4 py-3"
                >
                  <span className="font-semibold capitalize text-gray-500">{key}</span>
                  <span className="text-gray-900">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
