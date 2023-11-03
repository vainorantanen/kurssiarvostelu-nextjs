import prisma from '@/db';
import Link from 'next/link';

import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/options';
import FrontPageSearch from '@/components/FrontPageSearch';
import MakeCourseVisible from '@/components/MakeCourseVisible';
import Image from 'next/image';
import schoolImage from '@/Assets/school.png'
import booksPic from '@/Assets/books.png'
import geometryPic from '@/Assets/geometry.png'

type School = {
  id: string;
  name: string;
};

function getReviews() {
  return prisma.review.findMany()
}

function getVisibleCourses() {
  return prisma.course.findMany( { where: {
    isVisible: true
  } } )
}

function getNonVisibleCourses() {
  return prisma.course.findMany( { where: {
    isVisible: false
  } } )
}

async function makeCourseVisible(courseId: string) {
  "use server"
  
  await prisma.course.update({
    where: { id: courseId },
    data: { isVisible: true }
  });
}


function getSchools() {
  return prisma.school.findMany()
}

export default async function Home() {

  const session = await getServerSession(authOptions)

  console.log("session at Home", session)

  const reviews = await getReviews()

  const visibleCourses = await getVisibleCourses()
  const nonVisibleCourses = await getNonVisibleCourses()

  const schools: School[] = await getSchools()

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-4xl font-bold">Tervetuloa</h1>
      {session && session.user?.email === 'admin@moi.fi' && (
        <Link
          href="/lisaa-koulu"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Lisää koulu
        </Link>
      )}
      <div  className="relative h-64">
        <FrontPageSearch initialSchools={schools.sort((a, b) => a.name.localeCompare(b.name))}/>
        </div>
      <div className="flex flex-col gap-4 my-4 mt-4">
        <div className="flex items-center gap-4">
        <div className="relative w-48 h-48">
        <Image
        src={booksPic}
        alt="Notebook"
        />
         </div>
          <div className="ml-2">
            <p>Text for Picture 1</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="mr-2">
            <p>Text for Picture 2</p>
          </div>
          <div className="relative w-48 h-48">
          <Image
           src={geometryPic}
          alt="Geometry"
            />
           </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold">Alustan kurssit</h1>
      <ul className="pl-4">
        {visibleCourses.map((course) => (
          <li key={course.id} className="my-2">
            <Link href={`/kurssit/${course.id}`}>
              <p>{course.name}, {course.courseCode}</p>
            </Link>
          </li>
        ))}
      </ul>
      {session && session.user?.email === 'admin@moi.fi' && (
        <div>
          <h1 className="text-2xl font-bold">Hyväksymättömät kurssit</h1>
          <ul className="pl-4">
            {nonVisibleCourses.map((course) => (
              <li key={course.id} className="my-2">
                <Link href={`/kurssit/${course.id}`}>
                  <p>{course.name}, {course.courseCode}</p>
                </Link>
                <MakeCourseVisible id={course.id} makeCourseVisible={makeCourseVisible}/>
              </li>
            ))}
          </ul>
        </div>
      )}
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

