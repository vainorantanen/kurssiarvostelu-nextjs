"use client"

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChooseSearch({ koulutusohjelmat }: { koulutusohjelmat: Koulutusohjelma[] }) {
  const searchParams = useSearchParams();
  const [orgId, setOrgId] = useState(searchParams.get('orgId') || '');
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

  const label = orgId ? 'Valittu koulutusohjelma' : 'Valitse koulutusohjelma';

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">{label}</h2>
      <select
        className="p-2 border border-gray-300 rounded text-black max-w-[12rem]"
        value={orgId}
        onChange={(e) => setOrgId(e.target.value)}
      >
        <option value="">Valitse koulutusohjelma</option>
        {koulutusohjelmat.map((ohjelma) => (
          <option key={ohjelma.id} value={ohjelma.id}>
            {ohjelma.name.fi}
          </option>
        ))}
      </select>
      <br />
      <button
        className="my-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => handleSearch(orgId)}
      >
        Hae kurssit
      </button>
    </div>
  );
}
