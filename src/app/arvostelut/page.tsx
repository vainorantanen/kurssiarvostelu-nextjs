import React, { useEffect } from 'react';
import prisma from '@/db';
import Link from 'next/link';

function getReviews() {
  return prisma.review.findMany()
}

export default async function Reviews() {

  const reviews = await getReviews()
    return (
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">Kaikki arvostelut</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Hae arvostelut"
            className="px-3 py-2 border rounded w-64 shadow focus:outline-none text-black"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled // Add functionality here when needed
          >
            Etsi
          </button>
        </div>
        <Link
          href="/lisaa-arvostelu"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Lisää arvostelu
        </Link>
        <ul className="pl-4">
          {reviews.map((review) => (
            <li key={review.id} className="my-2">
              <Link href={`/kurssit/${review.id}`}>
                <p>{review.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <h1 className="text-2xl font-bold">Paljon arvosteluja saaneet kurssit</h1>
      </div>
    );
}
