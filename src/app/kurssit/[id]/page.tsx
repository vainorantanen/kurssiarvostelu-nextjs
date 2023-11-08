//import DeleteCourseButton from "@/components/DeleteCourseButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import DeleteReviewButton from "@/components/DeleteReviewButton";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaStar } from 'react-icons/fa';
import { User } from "@prisma/client";

/*
async function getCourse(courseId: string) {
  return prisma.course.findUnique({ where: { id: courseId } });
}
*/

async function getCourse(courseId: string) {
  "use server"

  const res = await fetch(`https://sis-tuni.funidata.fi/kori/api/course-units/v1/${courseId}`)
  const resultData = await res.json()
  return resultData as SingleCourse
}


async function getReviewsByCourse(courseSisuId: string) {
  return prisma.review.findMany({ where: { courseSisuId } })
}

async function getUser(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

async function deleteReview(id: string) {
    "use server"

    const session = await getServerSession(authOptions)

    const rev = await prisma.review.findUnique({ where: {id} })
    if (!rev) {
      throw new Error("Arvostelua ei löytynyt")
    }

    if (!session || !session.user || !session.user.email) {
      throw new Error("Sessionia ei ole")
    }

    const userFromDb = await getUser(session.user.email)

    if (!userFromDb) {
      throw new Error("Käyttäjää ei löytynyt")
    }

    if (session.user.email !== process.env.ADMIN && userFromDb.id !== rev.userId) {
      throw new Error("Vain admin tai arvostelun lisännyt voi poistaa arvostelun")
    }

    await prisma.review.delete({ where: { id } });

    redirect('/poistettu-onnistuneesti')
  }


  export default async function SingleCoursePage({ params }: any) {
    const course = await getCourse(params.id);
    const reviewsOfCourse = await getReviewsByCourse(params.id);
    const session = await getServerSession(authOptions)

    if (!course) {
      return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
          <Link href="/kurssit" className="text-blue-500 hover:underline">
            Takaisin
          </Link>
          <h1 className="text-3xl font-bold mt-4 text-gray-700">Kurssia ei löytynyt.</h1>
        </div>
      );
    }

    var userFromDb: User | null = null;


    if (session && session.user && session.user.email) {
      userFromDb = await getUser(session.user.email)
    }
      // Calculate the average star rating
      const totalRating = reviewsOfCourse.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRating / reviewsOfCourse.length;

      // Calculate grade statistics
        const gradeCounts: Record<string, number> = {
          '5': 0,
          '4': 0,
          '3': 0,
          '2': 0,          
          '1': 0,
          '0': 0,
        };

        reviewsOfCourse.forEach((review) => {
          gradeCounts[review.grade.toString()]++;
        });

        const yearCounts: Record<string, number> = {
          'N. vuonna': 0,
          '6. vuonna': 0,
          '5. vuonna': 0,
          '4. vuonna': 0,
          '3. vuonna': 0,
          '2. vuonna': 0,          
          '1. vuonna': 0,
        };

        reviewsOfCourse.forEach((review) => {
          if (review.year) {
            yearCounts[review.year.toString()]++
          }
         })

        return (
          <div className="min-h-screen flex flex-col md:flex-row">
            {/* Summary and Chart on small screens (1/3 width) */}
            <div className="w-full md:w-2/5 p-4">
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/koulut/${course.universityOrgIds[0]}`}>Takaisin</Link>
  </button>
  <h1 className="text-3xl font-bold my-4 text-white">{course.name.fi}</h1>
  <p className="mb-2">({course.credits.min === course.credits.max ? course.credits.min: `${course.credits.min} - ${course.credits.max}`}op)</p>
  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/lisaa-arvostelu/${course.id}`}>Arvostele tämä kurssi</Link>
  </button>
        
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">Yhteenveto</h2>
              {averageRating > 0 ? (
                <p className="text-white">Keskiarvo {averageRating.toFixed(1)} tähteä</p>
              ) : (
                <p className="text-white">Ei vielä arvosteluja</p>
              )}
              {Math.round(averageRating) > 0 ? (
                <div className="flex items-center text-black">
                {[...Array(Math.round(averageRating))].map((_, index) => (
                  <FaStar key={index} className="text-yellow-500" />
                ))}
              </div>
              ) : (
                <div className="flex items-center text-black">
                {[...Array(Math.round(5))].map((_, index) => (
                  <FaStar key={index} className="text-gray-500" />
                ))}
              </div>
              )}
              <p className="mt-2 text-xl font-bold">Vastanneiden saamat arvosanat</p>
              <div className="mt-4">
  {Object.keys(gradeCounts).reverse().map((grade) => {
    const gradeCount = gradeCounts[grade];
    const maxGradeCount = Math.max(...Object.values(gradeCounts));
    const barWidth = maxGradeCount === 0 ? '0%' : `${(gradeCount / maxGradeCount) * 100}%`;
    
    return (
      <div key={grade} className="grade-bar flex items-center text-white mt-1">
        <div className="w-1/4 text-right pr-2">{grade} </div>
        <div className={`w-2/4 ${gradeCount > 0 ? 'bg-blue-200 rounded' : 'bg-gray-300 rounded'}`}>
          <div
            className="h-4"
            style={{ width: barWidth, backgroundColor: 'blue', borderRadius: '0.2rem' }}
          ></div>
        </div>
        <div className="w-1/4 pl-2 text-right">{gradeCount} kpl</div>
      </div>
    );
  })}
</div>

<p className="mt-2 text-xl font-bold">Kurssien suoritusajankohdat</p>
              <div className="mt-4">
  {Object.keys(yearCounts).reverse().map((year) => {
    const yearCount = yearCounts[year];
    const maxYearCount = Math.max(...Object.values(yearCounts));
    const barWidth = maxYearCount === 0 ? '0%' : `${(yearCount / maxYearCount) * 100}%`;
    return (
      <div key={year} className="grade-bar flex items-center text-white mt-1">
        <div className="w-1/4 text-right pr-2">{year} </div>
        <div className={`w-2/4 ${yearCount > 0 ? 'bg-blue-200 rounded' : 'bg-gray-300 rounded'}`}>
          <div
            className="h-4"
            style={{ width: barWidth, backgroundColor: 'blue', borderRadius: '0.2rem' }}
          ></div>
        </div>
        <div className="w-1/4 pl-2 text-right">{yearCount} kpl</div>
      </div>
    );
  })}
</div>

            </div>
        
            {/* Reviews on small screens (2/3 width) */}
            <div className="w-full md:w-3/5 p-4">
              <h2 className="text-2xl font-bold text-white mt-5 mb-2 text-center">Arvostelut</h2>
              <div className="grid grid-cols-1 gap-4">
                {/* Reviews */}
                { reviewsOfCourse.length > 0 ? (
                  reviewsOfCourse.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
    
                        <p className="text-black mb-2 whitespace-break-spaces">{review.description}</p>
    
                      <div className="flex items-center text-black">
                        <p className="mr-2">Arvostelu</p>
                        {[...Array(review.rating)].map((_, index) => (
                          <FaStar key={index} className="text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-black">Saatu arvosana {review.grade}</p>
                      {userFromDb && (userFromDb.email === process.env.ADMIN
                      || userFromDb.id === review.userId) && (
                        <DeleteReviewButton id={review.id} deleteReview={deleteReview}/>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-white mb-2 text-center">Ei vielä arvosteluja</p>
                ) }
              </div>
            </div>
          </div>
        )
}
