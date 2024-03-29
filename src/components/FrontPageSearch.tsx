"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { School } from '@/utils/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type FrontPageSearchProps = {
  initialSchools: School[];
};


const FrontPageSearch: React.FC<FrontPageSearchProps> = ({ initialSchools }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [schools, setSchools] = useState<School[]>(initialSchools);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredSchools = initialSchools.filter((school) =>
      school.name.fi.toLowerCase().includes(value)
    );

    setSchools(filteredSchools);
    setIsMenuOpen(true);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Hae koulua"
        className="block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500 text-black"
        value={searchTerm}
        onChange={handleSearch}
        onClick={() => setIsMenuOpen(true)}
      />
      {isMenuOpen && schools.length > 0 && (
        <div>
        <div className="text-black left-0 w-full max-h-40 bg-white border rounded shadow mt-2 overflow-y-auto">
          <ul>
            {schools.map((school, index) => (
              <li key={school.id} className="my-2">
                <Link href={`/koulut/${school.id}`} className="hover:text-blue-500">
                  {school.name.fi}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
        onClick={() => setIsMenuOpen(false)}
        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mt-2"
      >
        Sulje
      </button>
      </div>
      )}
    </div>
  );
};

export default FrontPageSearch;


