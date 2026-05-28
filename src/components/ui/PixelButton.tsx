'use client';

import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export default function PixelButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: PixelButtonProps) {
  const baseClasses = 'font-pixel uppercase tracking-wider border-2 transition-all duration-100 inline-flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-pixel-highlight text-white border-white hover:bg-pixel-gold hover:text-pixel-dark',
    secondary: 'bg-pixel-accent text-white border-pixel-highlight hover:bg-pixel-highlight',
    danger: 'bg-red-700 text-white border-red-400 hover:bg-red-600',
    success: 'bg-pixel-green text-white border-green-400 hover:bg-green-600',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-[8px]',
    md: 'px-5 py-2.5 text-[10px]',
    lg: 'px-8 py-4 text-xs',
  };

  const activeClasses = disabled || loading
    ? 'opacity-50 cursor-not-allowed'
    : 'active:translate-x-[2px] active:translate-y-[2px] cursor-pointer';

  return (
    <button
      className={`${baseClasses}`}
      disabled={disabled || loading}
      style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
      {...props}
    >
      {loading ? (
        <span className="animate-pulse">...</span>
      ) : (
        children
      )}
    </button>
  );
}
