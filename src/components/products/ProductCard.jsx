import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import {
  Heart,
  Star,
  Truck,
  ShoppingCart,
  ShieldCheck,
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { getProductImage, getCategoryPlaceholder } from '../../utils/imageValidation';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const isInWishlist = useCartStore((state) => state.isInWishlist(product?.id));

  const {
    title,
    price,
    originalPrice,
    discount,
    rating,
    reviewCount,
    shipping,
    inStock,
    seller,
    isNewArrival,
    category,
  } = product || {};

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock && product) {
      addToCart(product);
      toast.success(`${title} added to cart!`);
    }
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      toggleWishlist(product);
      toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    }
  };

  // Get image with smart fallback - getProductImage handles all fallbacks
  const imageSrc = imageError
    ? getCategoryPlaceholder(category || 'electronics')
    : getProductImage(product, imageIndex);

  const handleImageError = () => {
    console.warn(`Image failed to load for product ${product?.id}:`, imageSrc);
    // Try next image in array if available
    if (product?.images && Array.isArray(product.images) && imageIndex < product.images.length - 1) {
      setImageIndex(imageIndex + 1);
      return;
    }
    // All images failed, use placeholder
    setImageError(true);
  };

  return (
    <Link
      to={`/product/${product?.id}`}
      className="block"
      aria-label={`View ${title}`}
    >
      <Motion.article
        whileHover={{ y: -4 }}
        className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-xl cursor-pointer"
      >
        <div className="absolute right-4 top-4 z-20 flex flex-col gap-2 pointer-events-none">
        {discount > 0 && (
          <Badge variant="danger" size="sm">
            -{discount}%
          </Badge>
        )}
        {isNewArrival && (
          <Badge variant="success" size="sm">
            New
          </Badge>
        )}
      </div>

        <button
          onClick={handleToggleWishlist}
          className={`absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition-colors pointer-events-auto ${
            isInWishlist ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
          }`}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>

        <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-50 relative z-10">
          <img
            key={`${product?.id}-${imageIndex}-${imageError}`}
            src={imageSrc}
            alt={title || 'Product image'}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={handleImageError}
          />
        </div>

        <div className="relative z-10 mt-4 flex flex-1 flex-col">
          <p className="line-clamp-2 text-sm font-semibold text-gray-900">
            {title}
          </p>

          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">{rating}</span>
            <span>({reviewCount.toLocaleString()} reviews)</span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-xl font-bold text-gray-900">{formatCurrency(price)}</p>
            {originalPrice > price && (
              <p className="text-sm text-gray-400 line-through">
                {formatCurrency(originalPrice)}
              </p>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {shipping?.freeShipping ? (
              <Badge variant="success" size="sm">
                Free Shipping
              </Badge>
            ) : (
              <div className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600">
                <Truck className="h-3.5 w-3.5" />
                <span>{shipping?.estimatedDays}</span>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="h-4 w-4 text-red-600" />
            <span>{seller}</span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span
              className={`text-sm font-semibold ${
                inStock ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            <Button
              size="sm"
              variant={inStock ? 'primary' : 'secondary'}
              disabled={!inStock}
              onClick={handleAddToCart}
              icon={ShoppingCart}
              className="group/btn relative z-30 px-4 pointer-events-auto"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Motion.article>
    </Link>
  );
};

export default ProductCard;

