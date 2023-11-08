import SearchCourses from "@/components/SearchCourses";
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

// school = organisation

async function getSchool(schoolId: string) {
  "use server"

  const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/organisations/${schoolId}`)
  const data = await res.json() as School
  
  return data
  
}

async function getKoulutusOhjelmat(schoolId: string) {
  "use server"

  const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/organisations/`)
  const data = await res.json() as Koulutusohjelma[]
  
  const koulutusOhjelmat = data.filter(d => d.universityOrgId === schoolId && d.parentId !== null)
  return koulutusOhjelmat
}

async function getAllReviews() {
  return prisma.review.findMany()
}

const getSearchCourses = async (orgId: string, universityOrgId: string) => {
  "use server"

  const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/course-unit-search?limit=1000&orgId=${orgId}&showMaxResults=false&start=0&uiLang=fi&universityOrgId=${universityOrgId}&validity=ONGOING_AND_FUTURE`)
  const resultData = await res.json()
  return resultData.searchResults as Course[]
}

export default async function SingleschoolPage({ params }: any) {
  const school = await getSchool(params.id);
  const allReviews = await getAllReviews()

  if (!school) {
    return (
      <div>
        <Link href="/" className="text-blue-500 hover:underline">
          Takaisin
        </Link>
        <h1 className="text-2xl font-bold mt-4">Yksittäinen Koulu</h1>
        <p className="text-gray-700">Koulua ei löytynyt.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl mt-4 mb-4 text-center font-bold">{school.name.fi} Kurssit</h1>
      <div className="mt-2 mb-3">
      <button className="ml-1 mt-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href='/'>Takaisin</Link>
  </button>
  <p className="mt-4 ml-1">Eikö kurssiasi ole täällä? </p>
  <button className="ml-1 mt-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/lisaa-kurssi/${school.id}`}>Lisää kurssi</Link>
  </button>
  </div>
      <SearchCourses allReviews={allReviews}
      schoolId={school.id} getSearchCourses={getSearchCourses}
      getKoulutusOhjelmat={getKoulutusOhjelmat}
      />
    </div>
  );
}

