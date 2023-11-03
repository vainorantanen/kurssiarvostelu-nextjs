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

  const visibleCourses = await getVisibleCourses()
  const nonVisibleCourses = await getNonVisibleCourses()

  const schools: School[] = await getSchools()

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-4xl my-4 font-bold">Femmat.fi</h1>
      {session && session.user?.email === process.env.ADMIN && (
        <Link
          href="/lisaa-koulu"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Lisää koulu
        </Link>
      )}
      <div className="h-64">
        <FrontPageSearch initialSchools={schools.sort((a, b) => a.name.localeCompare(b.name))}/>
        </div>
      <div className="flex flex-col gap-4 my-4 mt-4 container">
        <div className="flex items-center gap-4">
        <div className="relative w-48 h-48">
        <Image
        src={booksPic}
        alt="Books"
        />
         </div>
          <div className="ml-2">
              <h1 className='text-2xl mb-3'>Etsi koulusi</h1>
              <p>Hakemalla kursseja koulusi perusteella, löydät ne nopeiten.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="mr-2">
            <h1 className='text-2xl mb-3'>Katso kurssien arvosteluja</h1>
            <p>Tutki, mitä mieltä muut ovat kurssista olleet ja milloin he ovat sen suorittaneet.
              Voit myös kirjoittaa oman arvostelusi täysin anonyymisti!
            </p>
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
      {session && session.user?.email === process.env.ADMIN && (
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
    </div>
  );
}

