import React from 'react';

export const Header: React.FC = () => {
  return (
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary-100 px-6 py-4 flex justify-between items-center shadow-sm">
      <h1 class="font-serif font-black text-xl text-primary-900 tracking-tight">WalkMystery</h1>
      <span class="font-serif font-bold text-primary-800 text-sm sm:text-base">Morningside Heights + COLUMBIA</span>
    </header>
  );
};