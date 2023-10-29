import prisma from '@/db';
import Link from 'next/link';

import LoginInfo from '@/components/LoginInfo'
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

function getReviews() {
  return prisma.review.findMany()
}

function getCourses() {
  return prisma.course.findMany()
}

function getSchools() {
  return prisma.school.findMany()
}

export default async function Home() {

  const session = await getServerSession(authOptions)

  console.log("session at Home", session)

  const reviews = await getReviews()

  const courses = await getCourses()

  const schools = await getSchools()

    return (
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">Tervetuloa</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Hae kursseja"
            className="px-3 py-2 border rounded w-64 shadow focus:outline-none text-black"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled // Add functionality here when needed
          >
            Etsi
          </button>
        </div>
        <Link
          href="/lisaa-arvostelu"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Lisää arvostelu
        </Link>
        <Link
          href="/lisaa-kurssi"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Lisää kurssi
        </Link>
        <Link
          href="/lisaa-koulu"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Lisää koulu
        </Link>
        <Link
          href="/kurssit"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Selaa kursseja
        </Link>
        <h1 className="text-2xl font-bold">Koulut</h1>
        <ul className="pl-4">
          {schools.map((school) => (
            <li key={school.id} className="my-2">
              <Link href={`/koulut/${school.id}`}>
                <p>{school.name}</p>
              </Link>
            </li>
          ))}
        </ul>
        <h1 className="text-2xl font-bold">Kurssit</h1>
        <ul className="pl-4">
          {courses.map((course) => (
            <li key={course.id} className="my-2">
              <Link href={`/kurssit/${course.id}`}>
                <p>{course.name}</p>
              </Link>
            </li>
          ))}
        </ul>
        <h1 className="text-2xl font-bold">Arvostelut</h1>
        <ul className="pl-4">
          {reviews.map((review) => (
            <li key={review.id} className="my-2">
              <Link href={`/arvostelut/${review.id}`}>
                <p>{review.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
}

