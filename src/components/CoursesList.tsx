/*
import Link from "next/link";

const getCourses = async () => {
    try {
      const res = await fetch("api/courses", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch CougetCourses");
      }
      
      const data = await res.json()

      return data?.courses as any[];

    } catch (error) {
      console.log("Error loading CougetCourses: ", error);
    }
  };

export default async function CoursesList() {

    const courses = await getCourses()

  if (!courses || courses.length === 0) {
    return (
      <div>
        Ei kursseja
      </div>
    );
  }

  return (
    <ul className="pl-4">
      {courses.map((course: any) => (
        <li key={course.id} className="my-2">
          <Link href={`/kurssit/${course.id}`}>
            <p>{course.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
*/