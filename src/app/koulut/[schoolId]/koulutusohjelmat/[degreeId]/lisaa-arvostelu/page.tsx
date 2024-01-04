import { getServerSession } from "next-auth"
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AddReviewForm from "@/components/AddReviewForm";
import BackButton from "@/app/ui/schools/courses/BackButton";
import { addReview } from "@/app/lib/actions";
import { getDegree } from "@/app/lib/data";

export default async function AddDegreeReviewPage({ params }: any) {
  const degree = await getDegree(params.degreeId)

  const session = await getServerSession(authOptions)
  const sessionIsNull = session == null

  if (!degree) {
    return (
      <div>
        <Link href="/kurssit" className="text-blue-500 hover:underline">
          Takaisin
        </Link>
        <h1 className="text-2xl font-bold mt-4">Yksittäinen Kurssi</h1>
        <p className="text-gray-700">Kurssia ei löytynyt.</p>
      </div>
    );
  }

  return (
    <div className="text-center mt-3 min-h-screen">
      <BackButton />
      <h1 className="text-2xl font-bold my-4">Arvostele {degree.name.fi}, {degree.code} ({degree.targetCredits.min} op)</h1>
      {sessionIsNull && (
      <div className="p-4 max-w-xl mx-auto rounded shadow-lg bg-white text-black my-3">
        <h2 className="text-lg font-semibold mb-2">Huomasimme, että et ole kirjautuneena sisään.</h2>
        <p className="text-sm">Voit jättää arvostelun kirjautumattakin, mutta luodessasi profiilin koulusi sähköpostilla 
          arvosteluihisi lisätään verifioidun opiskelijan merkki.
        </p>
        <p className="text-sm">Kirjautumalla sisään pystyt myös halutessasi poistamaan omia arviointejasi.</p>
        <div className="flex flex-col gap-2">
        <Link href='/login' className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
        Kirjaudu
      </Link>
        <Link href='/register' className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
        Rekisteröidy
      </Link>
          </div>
      </div>
    )}

    </div>
  );
}
