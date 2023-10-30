"use client"

import { signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
//import LoginInfo from '@/components/LoginInfo'

export default function Navbar() {

  const { data: session } = useSession()

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
            <Link href="/login" className="text-white hover:text-blue-300">
              Kirjaudu
            </Link>
          </li>
          {session && (
            <li>
              Kirjautunut: <span className="text-black font-semibold">{session?.user?.name}</span>
            </li>
          )}
          {session && (
            <li>
            <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-3 py-1 mt-2 rounded"
        >
          Kirjaudu ulos
        </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
