import prisma from "@/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import AddCourseForm from "@/components/AddCourseForm"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

async function getSchool(schoolId: string) {
  return prisma.school.findUnique({ where: { id: schoolId } })
}

async function addCourse(name: string, schoolId: string) {
  "use server"

  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.email) {
    throw new Error("Sinun tulee kirjautua sisään lisätäksesi arvostelu")
  }

  if (typeof name !== "string" || name.length === 0 || 
  typeof schoolId !== "string" || schoolId.length === 0) {
      throw new Error("Invalid coursename")
    }

    // luodaan relaatio käyttäjän uniikin sähköpostin perusteella
  await prisma.course.create({ data: { name,
  school: {
      connect: {
          id: schoolId
      }
  } } })
  redirect('/kiitos-kurssin-lisaamisesta')
}

export default async function AddNewCourse({ params }: any) {

const school = await getSchool(params.id)

if (!school) {
  return null
}

return (
  <div className="flex flex-col items-center space-y-4">
    <div>
      <AddCourseForm id={school.id} schoolName={school.name} addCourse={addCourse}/>
    </div>
  </div>
);
}