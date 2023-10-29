import React, { useEffect } from 'react';
import prisma from '@/db';
import Link from 'next/link';

function getSchools() {
  return prisma.school.findMany()
}

export default async function Schools() {

  const schools = await getSchools()
    return (
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">Kaikki koulut</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Hae kouluja"
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
          href="/lisaa-koulu"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Lisää koulu
        </Link>
        <ul className="pl-4">
          {schools.map((school) => (
            <li key={school.id} className="my-2">
              <Link href={`/koulut/${school.id}`}>
                <p>{school.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
}

