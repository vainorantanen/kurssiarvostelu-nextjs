//import DeleteCourseButton from "@/components/DeleteCourseButton";
import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaStar } from 'react-icons/fa';

async function getCourse(courseId: string) {
  return prisma.course.findUnique({ where: { id: courseId } });
}

async function getReviewsByCourse(courseId: string) {
  return prisma.review.findMany({ where: { courseId } })
}

/*
export async function deleteCourse(id: string) {
    "use server"
  
    var success = false;

    try {
      await prisma.course.delete({ where: { id } });
      success = true
    } catch (error) {
      console.error("Error deleting course:", error);
    }

    if (success) {
        redirect('/poistettu-onnistuneesti')
    }
  }

  */
  export default async function SingleCoursePage({ params }: any) {
    const course = await getCourse(params.id);
    const reviewsOfCourse = await getReviewsByCourse(params.id);
  
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

        return (
          <div className="min-h-screen flex flex-col md:flex-row">
            {/* Summary and Chart on small screens (1/3 width) */}
            <div className="w-full md:w-1/3 p-4">
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/koulut/${course.schoolId}`}>Takaisin</Link>
  </button>
  <h1 className="text-3xl font-bold my-4 text-white">{course.name}</h1>
  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
    <Link href={`/lisaa-arvostelu/${course.id}`}>Arvostele tämä kurssi</Link>
  </button>
        
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">Yhteenveto</h2>
              <p className="text-white">Keskiarvo {averageRating.toFixed(1)} tähteä</p>
              <div className="flex items-center text-black">
                {[...Array(Math.round(averageRating))].map((_, index) => (
                  <FaStar key={index} className="text-yellow-500" />
                ))}
              </div>
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

            </div>
        
            {/* Reviews on small screens (2/3 width) */}
            <div className="w-full md:w-2/3 p-4">
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">Arvostelut</h2>
              <div className="grid grid-cols-1 gap-4">
                {/* Reviews */}
                {reviewsOfCourse.map((review) => (
                  <div key={review.id} className="bg-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg">
  
                      <p className="text-black mb-2">{review.description}</p>
  
                    <div className="flex items-center text-black">
                      <p className="mr-2">Arvostelu</p>
                      {[...Array(review.rating)].map((_, index) => (
                        <FaStar key={index} className="text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-black">Saatu arvosana {review.grade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
}
