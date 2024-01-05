"use client"

import { DegreeProgramme, Koulutusohjelma } from '@/utils/types';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChooseDegreeProgrammeSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <button
        className="my-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => handleSearch()}
      >
        Hae koulutusohjelmat
      </button>
    </div>
  );
}
