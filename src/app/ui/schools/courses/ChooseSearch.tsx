"use client"

import { Koulutusohjelma } from '@/utils/types';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChooseSearch({ koulutusohjelmat, tiedekunnat }: { koulutusohjelmat: Koulutusohjelma[],
  tiedekunnat: Koulutusohjelma[] }) {
  const searchParams = useSearchParams();
  const [orgId, setOrgId] = useState(searchParams.get('orgId') || '');
  const [ facultyId, setFacultyId ] = useState(searchParams.get('facultyId') || '')
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (orgId: string, facultyId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (orgId) {
      params.set('orgId', orgId);
    } else {
      params.delete('orgId');
    }
    if (facultyId) {
      params.set('facultyId', facultyId);
    } else {
      params.delete('facultyId');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className='py-2'>
      <h2 className="text-lg font-semibold mb-2">Valitse tiedekunta</h2>
      <select
        className="p-2 border border-gray-300 rounded text-black max-w-[12rem]"
        value={facultyId}
        onChange={(e) => {
          setFacultyId(e.target.value);
          setOrgId('none'); // Set orgId to 'none'
        }}      
      >
        <option value="none">Ei valintaa</option>
        {tiedekunnat.map((ohjelma) => (
          <option key={ohjelma.id} value={ohjelma.id}>
            {ohjelma.name.fi}
          </option>
        ))}
      </select>
      <br />
      </div>
      <div className='py-2'>
      <h2 className="text-lg font-semibold mb-2">Valitse koulutusohjelma</h2>
      <select
        className="p-2 border border-gray-300 rounded text-black max-w-[12rem]"
        value={orgId}
        onChange={(e) => setOrgId(e.target.value)}
      >
        <option value="none">Ei valintaa</option>
        {facultyId === '' || facultyId == 'none' ? (
          koulutusohjelmat.map((ohjelma) => (
            <option key={ohjelma.id} value={ohjelma.id}>
              {ohjelma.name.fi}
            </option>
          ))
        ) : (
          koulutusohjelmat.filter(k => k.parentId === facultyId).map((ohjelma) => (
            <option key={ohjelma.id} value={ohjelma.id}>
              {ohjelma.name.fi}
            </option>
          ))
        )}
      </select>
      <br />
      <button
        className="my-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => handleSearch(orgId, facultyId)}
      >
        Hae kurssit
      </button>
      </div>
    </div>
  );
}
