"use client"

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-2xl font-bold">
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-blue-300">
              Etusivu
            </Link>
          </li>
          <li>
            <Link href="/kurssit" className="text-white hover:text-blue-300">
              Kurssit
            </Link>
          </li>
          <li>
            <Link href="/lisaa-arvostelu" className="text-white hover:text-blue-300">
              Lisää arvostelu
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-white hover:text-blue-300">
              Rekisteröidy
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
