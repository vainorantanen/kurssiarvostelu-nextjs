import prisma from '@/db';
import Link from 'next/link';

import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/options';
import FrontPageSearch from '@/components/FrontPageSearch';

type School = {
  id: string;
  name: string;
};

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

  const schools: School[] = await getSchools()

    return (
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">Tervetuloa</h1>
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
        <FrontPageSearch initialSchools={schools}/>
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

