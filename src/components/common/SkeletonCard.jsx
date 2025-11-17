// src/components/common/SkeletonCard.jsx
import React from 'react';
import { motion as Motion } from 'framer-motion';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
      {/* Image skeleton */}
      <Motion.div
        className="w-full h-64 bg-gray-200 rounded-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Content skeleton */}
      <div className="space-y-3">
        {/* Title */}
        <Motion.div
          className="h-5 bg-gray-200 rounded w-3/4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        />

        {/* Price */}
        <Motion.div
          className="h-6 bg-gray-200 rounded w-1/4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />

        {/* Rating */}
        <Motion.div
          className="h-4 bg-gray-200 rounded w-1/3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />

        {/* Button */}
        <Motion.div
          className="h-10 bg-gray-200 rounded-lg w-full mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
};

// Grid of skeleton cards
export const SkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonCard;