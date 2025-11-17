// src/components/common/Input.jsx
import React, { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = true,
  className,
  containerClassName,
  ...props
}, ref) => {
  const inputClasses = clsx(
    'px-4 py-3 rounded-lg border transition-all duration-200 outline-none',
    'focus:ring-2 focus:ring-navy-500 focus:border-transparent',
    error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 hover:border-gray-400',
    Icon && iconPosition === 'left' && 'pl-11',
    Icon && iconPosition === 'right' && 'pr-11',
    fullWidth && 'w-full',
    props.disabled && 'bg-gray-100 cursor-not-allowed',
    className
  );

  return (
    <div className={clsx('space-y-1', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        
        {Icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;