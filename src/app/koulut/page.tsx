import React, { useEffect } from 'react';
import prisma from '@/db';
import Link from 'next/link';

export default async function Schools() {

    return (
      <div className="flex flex-col items-center space-y-4">
        <h1>Kaikki koulut</h1>
      </div>
    );
}

