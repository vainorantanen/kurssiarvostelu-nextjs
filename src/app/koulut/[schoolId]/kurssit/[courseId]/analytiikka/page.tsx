//import DeleteCourseButton from "@/components/DeleteCourseButton";
import { getServerSession } from "next-auth"
import prisma from "@/db";
import Link from "next/link";
import { getCourse, getReviewsByCourse, getSchool } from '@/app/lib/data';
import BackButton from "@/app/ui/schools/courses/BackButton";

export default async function SingleCourseAnalyticsPage({ params }: any) {
  const course = await getCourse(params.courseId)
  const school = await getSchool(params.schoolId)

  if (!course) {
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

  const reviewsOfCourse = await getReviewsByCourse(params.courseId);

  // Calculate grade statistics
  const gradeCounts: Record<string, number> = {
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
    '1': 0,
    '0': 0,
    'En halua kertoa': 0
  };

  reviewsOfCourse.forEach((review) => {
    gradeCounts[review.grade.toString()]++;
  });
  
  const overallRatingCounts: Record<string, number> = {
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
    '1': 0,
  };

  reviewsOfCourse.forEach((review) => {
    overallRatingCounts[review.rating.toString()]++;
  });

  const yearCounts: Record<string, number> = {
    'N. vuonna': 0,
    '6. vuonna': 0,
    '5. vuonna': 0,
    '4. vuonna': 0,
    '3. vuonna': 0,
    '2. vuonna': 0,          
    '1. vuonna': 0,
    'En halua kertoa': 0
  };

  reviewsOfCourse.forEach((review) => {
    if (review.year) {
      yearCounts[review.year.toString()]++
    }
   })

   const workloadCounts: Record<string, number> = {
    'Todella kevyt': 0,
    'Kevyt': 0,
    'Sopiva': 0,
    'Suuri': 0,
    'Liian suuri': 0,
  };

  reviewsOfCourse.forEach((review) => {
    workloadCounts[review.workload.toString()]++;
  });

  const benefitCounts: Record<string, number> = {
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
    '1': 0,
  };

  reviewsOfCourse.forEach((review) => {
    benefitCounts[review.benefit.toString()]++;
  });

  const materialCounts: Record<string, number> = {
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
    '1': 0,
  };

  reviewsOfCourse.forEach((review) => {
    materialCounts[review.materials.toString()]++;
  });

  const expectationCounts: Record<string, number> = {
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
    '1': 0,
  };

  reviewsOfCourse.forEach((review) => {
    expectationCounts[review.expectations.toString()]++;
  });

  return (
    <div className="text-center mt-3 min-h-screen">
      <BackButton />
      <h1 className="text-2xl font-bold my-4">Analytiikka {course.name.fi}, {course.code} ({course.credits.min === course.credits.max ? course.credits.min: `${course.credits.min} - ${course.credits.max}`}op)</h1>
      <h2 className="text-xl font-bold my-4">Yleisarvosanajakauma</h2>

      <div className="mt-4">
  {Object.keys(overallRatingCounts).reverse().map((rating) => {
    const ratingCount = overallRatingCounts[rating];
    const maxRatingCount = Math.max(...Object.values(overallRatingCounts));
    const barWidth = maxRatingCount === 0 ? '0%' : `${(ratingCount / maxRatingCount) * 100}%`;
    
    return (
      <div key={rating} className="grade-bar flex items-center text-white mt-1">
        <div className="w-1/4 text-right pr-2">{rating} </div>
        <div className={`w-2/4 ${ratingCount > 0 ? 'bg-blue-200 rounded' : 'bg-gray-300 rounded'}`}>
          <div
            className="h-4"
            style={{ width: barWidth, backgroundColor: 'blue', borderRadius: '0.2rem' }}
          ></div>
        </div>
        <div className="w-1/4 pl-2 text-left">{ratingCount} kpl</div>
      </div>
    );
  })}
</div>

      <h2 className="text-xl font-bold my-4">Vastanneiden arvosanajakauma</h2>
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
        <div className="w-1/4 pl-2 text-left">{gradeCount} kpl</div>
      </div>
    );
  })}
</div>
      <h2 className="text-xl font-bold my-4">Suoritusajankohdat</h2>
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
        <div className="w-1/4 pl-2 text-left">{yearCount} kpl</div>
      </div>
    );
  })}
</div>

      <h2 className="text-xl font-bold my-4">Työmäärä</h2>

      <div className="mt-4">
  {Object.keys(workloadCounts).reverse().map((workload) => {
    const workloadCount = workloadCounts[workload];
    const maxWorkloadCount = Math.max(...Object.values(workloadCounts));
    const barWidth = maxWorkloadCount === 0 ? '0%' : `${(workloadCount / maxWorkloadCount) * 100}%`;
    
    return (
      <div key={workload} className="grade-bar flex items-center text-white mt-1">
        <div className="w-1/4 text-right pr-2">{workload} </div>
        <div className={`w-2/4 ${workloadCount > 0 ? 'bg-blue-200 rounded' : 'bg-gray-300 rounded'}`}>
          <div
            className="h-4"
            style={{ width: barWidth, backgroundColor: 'blue', borderRadius: '0.2rem' }}
          ></div>
        </div>
        <div className="w-1/4 pl-2 text-left">{workloadCount} kpl</div>
      </div>
    );
  })}
</div>

      <h2 className="text-xl font-bold my-4">Hyöty</h2>

      <div className="mt-4">
  {Object.keys(benefitCounts).reverse().map((benefit) => {
    const benefitCount = benefitCounts[benefit];
    const maxBenefitCount = Math.max(...Object.values(benefitCounts));
    const barWidth = maxBenefitCount === 0 ? '0%' : `${(benefitCount / maxBenefitCount) * 100}%`;
    
    return (
      <div key={benefit} className="grade-bar flex items-center text-white mt-1">
        <div className="w-1/4 text-right pr-2">{benefit} </div>
        <div className={`w-2/4 ${benefitCount > 0 ? 'bg-blue-200 rounded' : 'bg-gray-300 rounded'}`}>
          <div
            className="h-4"
            style={{ width: barWidth, backgroundColor: 'blue', borderRadius: '0.2rem' }}
          ></div>
        </div>
        <div className="w-1/4 pl-2 text-left">{benefitCount} kpl</div>
      </div>
    );
  })}
</div>

      <h2 className="text-xl font-bold my-4">Materiaalit</h2>

      <div className="mt-4">
  {Object.keys(materialCounts).reverse().map((material) => {
    const materialCount = materialCounts[material];
    const maxMaterialCount = Math.max(...Object.values(materialCounts));
    const barWidth = maxMaterialCount === 0 ? '0%' : `${(materialCount / maxMaterialCount) * 100}%`;
    
    return (
      <div key={material} className="grade-bar flex items-center text-white mt-1">
        <div className="w-1/4 text-right pr-2">{material} </div>
        <div className={`w-2/4 ${materialCount > 0 ? 'bg-blue-200 rounded' : 'bg-gray-300 rounded'}`}>
          <div
            className="h-4"
            style={{ width: barWidth, backgroundColor: 'blue', borderRadius: '0.2rem' }}
          ></div>
        </div>
        <div className="w-1/4 pl-2 text-left">{materialCount} kpl</div>
      </div>
    );
  })}
</div>

      <h2 className="text-xl font-bold my-4">Odotuksiin vastaaminen</h2>

      <div className="mt-4">
  {Object.keys(expectationCounts).reverse().map((expectation) => {
    const expectationCount = expectationCounts[expectation];
    const maxExpectationCount = Math.max(...Object.values(expectationCounts));
    const barWidth = maxExpectationCount === 0 ? '0%' : `${(expectationCount / maxExpectationCount) * 100}%`;
    
    return (
      <div key={expectation} className="grade-bar flex items-center text-white mt-1">
        <div className="w-1/4 text-right pr-2">{expectation} </div>
        <div className={`w-2/4 ${expectationCount > 0 ? 'bg-blue-200 rounded' : 'bg-gray-300 rounded'}`}>
          <div
            className="h-4"
            style={{ width: barWidth, backgroundColor: 'blue', borderRadius: '0.2rem' }}
          ></div>
        </div>
        <div className="w-1/4 pl-2 text-left">{expectationCount} kpl</div>
      </div>
    );
  })}
</div>

    </div>
  );
}
