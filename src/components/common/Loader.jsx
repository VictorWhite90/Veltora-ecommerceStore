// src/components/common/Loader.jsx
import React from 'react';
import { motion as Motion } from 'framer-motion';
import clsx from 'clsx';

const Loader = ({ size = 'md', fullScreen = false, text }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      <Motion.div
        className={clsx(
          'border-4 border-navy-200 border-t-navy-600 rounded-full',
          sizes[size]
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <p className="text-gray-600 text-sm font-medium">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;