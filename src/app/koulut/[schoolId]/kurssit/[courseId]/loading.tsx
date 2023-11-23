import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-t-4 border-white border-solid rounded-full h-12 w-12 animate-spin"></div>
      <p className="ml-2 text-white text-2xl">Ladataan...</p>
    </div>
  );
}
