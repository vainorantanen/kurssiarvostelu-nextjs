"use client"

import React, { useState } from 'react';
import Link from 'next/link';

type School = {
  id: string;
  name: string;
};

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
      school.name.toLowerCase().includes(value)
    );

    setSchools(filteredSchools);
    setIsMenuOpen(true);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Hae koulua"
        className="px-3 py-2 border rounded w-96 shadow focus:outline-none text-black"
        value={searchTerm}
        onChange={handleSearch}
        onClick={() => setIsMenuOpen(true)}
      />
      {isMenuOpen && schools.length > 0 && (
        <div className="absolute text-black top-full left-0 w-96 max-h-40 bg-white border rounded shadow mt-2 max-h-[60vh] overflow-y-auto">
          <ul>
            {schools.map((school, index) => (
              <li key={school.id} className="my-2">
                <Link href={`/koulut/${school.id}`}
                className="hover:text-blue-500">{school.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FrontPageSearch;


