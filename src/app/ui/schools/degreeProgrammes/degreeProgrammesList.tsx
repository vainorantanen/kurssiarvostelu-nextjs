
import Image from "next/image";
import Link from "next/link";
import graduateImage from '@/Assets/graduate.png'
import { FaStar } from "react-icons/fa";
import { getSearchDegreeProgrammes } from "@/app/lib/data";

export default async function DegreeProgrammesList({
    universityOrgId,
    currentPage,
    query,
  }: {
    universityOrgId: string;
    currentPage: number;
    query: string;
  }) { 

    const degreeProgrammesResult = await getSearchDegreeProgrammes(universityOrgId, query, currentPage)
    const degreeProgrammes = degreeProgrammesResult.searchResults

    if (!degreeProgrammes || degreeProgrammes.length == 0) {
        return (
          <div className="bg-white rounded text-black py-4 text-center">
            <h2 className="font-bold text-xl">Lisää rajaustekijöitä</h2>
            <p className="py-2">Valitse tiedekunta ja/tai koulutusohjelma tai koulutusohjelmaa hakusanalla (vähintään 3 merkkiä).</p>
          </div>
        )
    }

    return (
      <div>
        <p className="font-bold">{degreeProgrammesResult.total} hakutulosta</p>
        {degreeProgrammes.map(degree => {

          return (
            <div
            key={degree.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex items-center my-2"
          >
            <div className="mr-4">
                                <Link href={`/`}>
                                  <div className="relative w-16 h-16">
                                    <Image
                                      src={graduateImage}
                                      alt="Graduate"
                                      layout="fill"
                                      objectFit="cover"
                                      className="rounded-full"
                                    />
                                  </div>
                                </Link>
                              </div>
                              <div>
                              <Link href={`/koulut/${universityOrgId}/koulutusohjelmat/${degree.id}`}>
                <p className="text-lg font-semibold text-blue-500 hover:underline">
                  {degree.name}, {degree.code} ({degree.credits.min} op)
                </p>
              </Link>
                              </div>
          </div>
          )
        
       })}
       
       </div>
       )
       
  }