import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 animate-spin"></div>
      <p className="ml-2 text-blue-500 text-2xl">Ladataan...</p>
    </div>
  );
}
