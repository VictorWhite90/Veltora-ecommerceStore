// src/components/common/Card.jsx
import React from 'react';
import { motion as Motion } from 'framer-motion';
import clsx from 'clsx';

const Card = ({
  children,
  hover = false,
  padding = 'md',
  shadow = 'sm',
  className,
  onClick,
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const cardClasses = clsx(
    'bg-white rounded-xl border border-gray-100 transition-all duration-200',
    paddingClasses[padding],
    shadowClasses[shadow],
    hover && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
    onClick && 'cursor-pointer',
    className
  );

  if (hover || onClick) {
    return (
      <Motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cardClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </Motion.div>
    );
  }

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;