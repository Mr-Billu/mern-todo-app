import React from 'react'

export function Card({ className = '', ...props }) {
  const base = 'rounded-xl border border-gray-200 bg-white shadow';
  return <div className={`${base} ${className}`} {...props} />
}


