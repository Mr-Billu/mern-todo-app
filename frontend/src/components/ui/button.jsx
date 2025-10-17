import React from 'react'

export function Button({ className = '', variant = 'default', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2';
  const variants = {
    default: 'bg-black text-white hover:bg-gray-800',
    outline: 'border border-gray-300 bg-black/80 hover:bg-gray-800 hover:text-white ',
    link: 'text-blue-600 underline-offset-4 hover:underline bg-transparent h-auto px-0 py-0',
  };
  const variantClasses = variants[variant] || variants.default;
  return <button className={`${base} ${variantClasses} ${className}`} {...props} />
}


