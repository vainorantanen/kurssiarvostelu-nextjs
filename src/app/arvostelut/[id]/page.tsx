//import DeleteReviewButton from "@/components/DeleteReviewButton";
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getReview(reviewId: string) {
  return prisma.review.findUnique({ where: { id: reviewId } });
}

/*
export async function deleteReview(id: string){
    "use server"
    await prisma.review.delete({ where: { id } });

    redirect('/poistettu-onnistuneesti')
  }

  */

export default async function SingleReviewPage({ params }: any) {
  const review = await getReview(params.id);

  if (!review) {
    return (
      <div>
        <Link href="/kurssit" className="text-blue-500 hover:underline">
          Takaisin
        </Link>
        <h1 className="text-2xl font-bold mt-4">Yksittäinen arvostelu</h1>
        <p className="text-gray-700">Arvostelua ei löytynyt.</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Link href="/kurssit" className="text-blue-500 hover:underline">
        Takaisin
      </Link>
      <h1 className="text-2xl font-bold my-4">Yksittäinen arvostelu</h1>
      <p>{review.description}</p>
    </div>
  );
}
