"use client"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ChooseSearch({ koulutusohjelmat }: { koulutusohjelmat: Koulutusohjelma[] }) {
  const [ orgId, setOrgId ] = useState('')
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (orgId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (orgId) {
      params.set('orgId', orgId);
    } else {
      params.delete('orgId');
    }
    replace(`${pathname}?${params.toString()}`);
  };  
 
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Valitse koulutusohjelma</h2>          
    <select
className="p-2 border border-gray-300 rounded text-black max-w-[12rem]"
                    onChange={(e) => setOrgId(e.target.value)}
                  >
                    {koulutusohjelmat.map(ohjelma => (
 <option key={ohjelma.id} value={ohjelma.id} >
           {ohjelma.name.fi}
                      </option>
))}
                  </select>
     <br></br>
<button
  className="my-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
 onClick={() => handleSearch(orgId)}>Hae kurssit</button>
    </div>
  );
}