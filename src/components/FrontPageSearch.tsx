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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredSchools = initialSchools.filter((school) =>
      school.name.toLowerCase().includes(value)
    );

    setSchools(filteredSchools);
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Hae koulua"
          className="px-3 py-2 border rounded w-64 shadow focus:outline-none text-black"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <h1 className="text-2xl font-bold">Koulut</h1>
      <ul className="pl-4">
        {schools.map((school) => (
          <li key={school.id} className="my-2">
             <Link href={`/koulut/${school.id}`}>
              <a>{school.name}</a> {/* Use <a> tag inside Link */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FrontPageSearch;
