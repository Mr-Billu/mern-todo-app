import React from 'react'

export function Input({ className = '', ...props }) {
  const base = 'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900';
  return <input className={`${base} ${className}`} {...props} />
}


