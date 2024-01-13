import Link from 'next/link';

import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/options';
import FrontPageSearch from '@/components/FrontPageSearch';
import MakeCourseVisible from '@/components/MakeCourseVisible';
import Image from 'next/image';
import schoolImage from '@/Assets/school.png'

import { FaStar, FaCheckCircle, FaThumbsUp } from 'react-icons/fa';
import { getSchools } from './lib/data';
import FrontPageInfo from './ui/frontpage-info';


export default async function Home() {

  const session = await getServerSession(authOptions)

  const schools = await getSchools()

  return (
    <div className='w-full'>

      <div className='grid grid-cols-1 sm:grid-cols-2 my-4 gap-2 w-full'>
        <div className='sm:grid-cols-1'>
          <h1 className="text-2xl md:text-4xl py-1 font-bold tracking-wide">Lue arvosteluja.</h1>
          <h1 className="text-2xl md:text-4xl py-1 font-bold tracking-wide">Kirjoita arvosteluja.</h1>
          <h1 className="text-2xl md:text-4xl py-1 font-bold tracking-wide">Löydä parhaat kurssit sinun koulutusohjelmaasi.</h1>
          
          <div className='py-3'>
          <FrontPageSearch initialSchools={schools.sort((a, b) => a.name.fi.localeCompare(b.name.fi))}/>
          </div>

        </div>
        <div className='sm:grid-cols-1'>
          {/* Example review */}

          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg
                    flex flex-wrap gap-3">
                      <div className={`flex flex-col text-black text-center font-bold`}>
                        <div className={`rounded p-2 bg-green-500`}>
                        <p>Yhteensä</p>
                        <p className="text-xl">{4.5}</p>
                        </div>
                        <div className="py-3 gap-2 flex items-center">
                          <FaThumbsUp />
                          <p>{100}</p>
                          </div>
                        </div>
                        <div>
                         <p className="text-xs text-black mb-2">1.1.2024, Suoritettu: {2023}</p>
                        <div className="mb-2 flex items-center">
                          <FaCheckCircle className="text-blue-500 mr-2" />
                          <p className="text-black">Verifioitu opiskelija</p>
                        </div>
                        <p className="text-black mb-2 whitespace-break-spaces">Kuvaus tähän</p>
    
                          <div className="text-black mb-2">
                            <h2 className="text-lg">Vinkit</h2>
                            <p>Tässä vinkit</p>
                          </div>
                      <div>
                      <table className="table-auto mb-2">
  <tbody>
    <tr>
      <td className="pr-4">
        <p className="text-black">Yleisarvosana</p>
      </td>
      <td className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td className="pr-4">
        <p className="text-black">Kurssi vastasi odotuksia</p>
      </td>
      <td className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td className="pr-4">
        <p className="text-black">Kurssin materiaalit</p>
      </td>
      <td className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td className="pr-4">
        <p className="text-black">Hyöty</p>
      </td>
      <td className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td>
          <p className="text-black pr-4">Helppous</p>
      </td>
      <td className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td>
          <p className="text-black pr-4">Kiinnostavuus</p>
      </td>
      <td className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
      </td>
    </tr>
    <tr>
      <td>
          <p className="text-black pr-4">Työmäärä</p>
      </td>
      <td>
        <p className="text-black">{"Sopiva"}</p>
      </td>
    </tr>
    <tr>
      <td>
          <p className="text-black pr-4">Saatu arvosana </p>
      </td>
      <td>
        <p className="text-black">{5}</p>
      </td>
    </tr>
    <tr>
      <td>
          <p className="text-black pr-4">Arvostelukriteerit</p>
      </td>
      <td>
           <p className="text-black">
           Koepainotteinen
         </p>
          
      </td>
    </tr>
    <tr>
      <td>
          <p className="text-black pr-4">Toteutusmuoto</p>
      </td>
      <td>
          <p className="text-black">Hybridi</p>
      </td>
    </tr>
  </tbody>
</table>
                        </div>
                      
                
                    </div>
                    </div>

        </div>
      </div>
      



      <FrontPageInfo />

      <h1 className="text-xl sm:text-3xl font-bold text-center py-3">Alustan koulut</h1>
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

