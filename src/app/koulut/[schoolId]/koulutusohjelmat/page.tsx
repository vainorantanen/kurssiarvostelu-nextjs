import { getSchool, getSearchDegreeProgrammePages } from "@/app/lib/data";
import BackButton from "@/app/ui/schools/courses/BackButton";
import ChooseDegreeProgrammeSearch from "@/app/ui/schools/courses/ChooseDegreeProgammeSearch";
import ChooseSearch from "@/app/ui/schools/courses/ChooseSearch";
import TextSearch from "@/app/ui/schools/courses/TextSearch";
import DegreeProgrammesList from "@/app/ui/schools/degreeProgrammes/degreeProgrammesList";
import Pagination from "@/app/ui/schools/pagination";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

export default async function SchoolsDegreeProgrammesPage({ params,
  searchParams }: {params: any, searchParams?: {
    page?: string;
    query?: string;
  }}) {
  const school = await getSchool(params.schoolId)

  const currentPage = Number(searchParams?.page) || 1;

  const query = searchParams?.query || ''
  const totalPages = await getSearchDegreeProgrammePages(school.id, query);

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
      <h1 className="text-2xl mt-4 mb-4 text-center font-bold">Kohteen {school.name.fi} kurssien ja koulutusohjelmien arvostelut</h1>
      <div className="mt-2 mb-3">
      <button className="mt-1 mb-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href='/'>Etusivu</Link>
  </button>
  <br></br>
  <BackButton />

  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="md:col-span-1">
  <div className="p-2 bg-white rounded shadow text-black">
  <h2 className="text-xl font-bold">{school.name.fi} koulutusohjelmien arvostelut</h2>
    <p>Tällä sivulla voit lukea {school.name.fi} koulutusohjelmien arvosteluja.</p>
    <p>Voit myös jättää oman arvostelun.</p>
</div>


  </div>
  <div className="md:col-span-2">
  <div className="grid grid-cols-1 gap-4">
    <h1 className="text-2xl text-center font-bold">{school.name.fi} koulutusohjelmien arvostelut</h1>
    <TextSearch placeholder="Hae koulutusohjelmaa..."/>
    <DegreeProgrammesList universityOrgId={params.schoolId} currentPage={currentPage} query={query}/>
    {totalPages != null && totalPages > 1 && (
      <div className="mt-5 flex w-full justify-center text-center">
      <Pagination totalPages={totalPages} />
   </div>
    )}
    </div>
    </div>
  </div>
 </div>
  );
}
