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
import anonymPic from '@/Assets/anonym.png'
import { redirect } from 'next/navigation';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

/*
function getSchools() {
  return prisma.school.findMany()
}
*/

async function getSchools() {
  "use server"

  const res = await fetch("https://sis-tuni.funidata.fi/kori/api/organisations")
  const data = await res.json() as School[]
  
  const schools = data.filter(d => d.parentId == null)
  return schools
  
}

export default async function Home() {

  const session = await getServerSession(authOptions)

  console.log("session at Home", session)

  const schools: School[] = await getSchools()

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-4xl my-4 font-bold">Femma</h1>
      <div className="h-64">
        <FrontPageSearch initialSchools={schools.sort((a, b) => a.name.fi.localeCompare(b.name.fi))}/>
        </div>
        <div className="flex items-center flex-wrap gap-4 justify-center">
        <div className="relative w-60 h-60">
        <Image
        src={booksPic}
        alt="Books"
        />
         </div>
          <div className="max-w-lg">
              <h1 className='text-2xl font-bold mb-3'>Etsi haluamasi kurssi koulusi kurssitarjonnasta</h1>
              <p>Voit hakea kursseja koulujen perusteella suoraan hakusanoilla tai suodattamalla hakutuloksia
                 haluamallasi tavalla.
              </p>
          </div>
        </div>
        <br></br>
        <div className="flex items-center flex-wrap-reverse gap-4 justify-center">
          <div className="max-w-lg">
              <h1 className='text-2xl font-bold mb-3'>Lue kurssin arvosteluja ja lisää omasi</h1>
              <p>Tutustumalla kurssin saamiin arvosteluihin muilta opiskelijoilta ja alumneilta, 
                pystyt valitsemaan opintoihisi sopivimmat kurssit.
              </p>
          </div>
          <div className="relative w-60 h-60">
        <Image
        src={geometryPic}
        alt="Geometry"
        />
         </div>
        </div>
        <br></br>
        <div className="flex items-center flex-wrap gap-4 justify-center">
        <div className="relative w-60 h-60">
        <Image
        src={anonymPic}
        alt="Anonyymi"
        />
         </div>
          <div className="max-w-lg">
              <h1 className='text-2xl font-bold mb-3'>Anonyymit arvostelut</h1>
              <p>Arvostelut ovat täysin anonyymejä eli arvostelijan tiedot eivät ole muiden näkyvillä. 
                Voit siis huoletta antaa kurssien risut ja ruusut! 
              </p>
          </div>
        </div>
        <br></br>
        <div className="flex items-center flex-wrap-reverse gap-4 justify-center">
          <div className="max-w-lg">
              <h1 className='text-2xl font-bold mb-3'>Verifioitu opiskelija -merkki</h1>
              <p>Kirjautumalla sisään koulusi sähköpostilla ja vahvistamalla sen, saat verifioidun opiskelijan merkin arvosteluusi.
              Arvostelun voi jättää myös kirjautumatta sisään! 
              </p>
          </div>
          <div>
        <FaCheckCircle
          className="w-60 h-60"
        />
         </div>
        </div>
      <h1 className="text-3xl font-bold">Alustan koulut</h1>
      <div className="flex flex-wrap justify-center">
  {schools.map((school) => (
    <div key={school.id} className="m-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg w-48">
      <Link href={`/koulut/${school.id}`}>
        <div className="relative h-40 w-full">
          <Image
            src={schoolImage} // Kuvan lähde
            alt={school.name.fi}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p className="text-xl text-black font-semibold mt-2 hover:underline">{school.name.fi}</p>
      </Link>
    </div>
  ))}
</div>
    </div>
  );
}

/*

{session && session.user?.email === process.env.ADMIN && (
        <div>
          <h1 className="text-2xl font-bold">Hyväksymättömät kurssit</h1>
          <ul className="pl-4">
            {nonVisibleCourses.map((course) => (
              <li key={course.id} className="my-2">
                <Link href={`/kurssit/${course.id}`}>
                  <p>{course.name}, {course.courseCode}, {schools.find(s => s.id === course.schoolId)?.name}</p>
                </Link>
                <p>Kieli: {course.lang}, {course.minCredits} - {course.maxCredits}op</p>
                <MakeCourseVisible id={course.id} makeCourseVisible={makeCourseVisible}/>
              </li>
            ))}
          </ul>
        </div>
      )}
*/

