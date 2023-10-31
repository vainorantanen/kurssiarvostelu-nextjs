"use client"

import { signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from "react";
//import LoginInfo from '@/components/LoginInfo'

export default function Navbar() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    return (
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-white text-2xl font-bold hover:underline">
              Your Logo
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-white hover:text-blue-300 hover:underline">
              Etusivu
            </Link>
            <Link href="/login" className="text-white hover:text-blue-300 hover:underline">
              Kirjaudu
            </Link>
            {session ? (
              <span className="text-white">
                Kirjautunut: <span className="text-black font-semibold">{session?.user?.name}</span>
              </span>
            ) : null}
            {session ? (
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white font-bold px-3 py-1 mt-2 rounded hover:bg-red-600"
              >
                Kirjaudu ulos
              </button>
            ) : null}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden text-white">
            <ul className="flex flex-col items-center mt-4 space-y-4">
              <li>
                <Link href="/" className="hover:text-blue-300 hover:underline">
                  Etusivu
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-blue-300 hover:underline">
                  Kirjaudu
                </Link>
              </li>
              {session && (
                <li>
                  Kirjautunut:{" "}
                  <span className="text-black font-semibold">{session?.user?.name}</span>
                </li>
              )}
              {session && (
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white font-bold px-3 py-1 mt-2 rounded hover:bg-red-600"
                >
                  Kirjaudu ulos
                </button>
              )}
            </ul>
          </div>
        )}
      </nav>
    );
  }

