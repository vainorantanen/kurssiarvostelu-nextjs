import prisma from "@/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import AddCourseForm from "@/components/AddCourseForm"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

async function getSchool(schoolId: string) {
  return prisma.school.findUnique({ where: { id: schoolId } })
}

async function addCourse(name: string, schoolName: string, code: string,
 credits: string ) {
  "use server"

  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.email) {
    throw new Error("Sinun tulee kirjautua sisään lisätäksesi arvostelu")
  }

  if (
    typeof name !== "string" ||
    name.length === 0 ||
    typeof code !== "string" ||
    code.length === 0 ||
    typeof schoolName !== 'string' || schoolName.length === 0
    || typeof credits !== 'string' || credits.length === 0
  ) {
    throw new Error("Invalid course information");
  }

    // luodaan relaatio käyttäjän uniikin sähköpostin perusteella
  await prisma.courseRequest.create({ data: { name, code, schoolName, credits} })
  redirect('/kiitos-kurssin-lisaamisesta')
}

export default async function AddNewCourse({ params }: any) {

const school = await getSchool(params.id)

if (!school) {
  return null
}

return (
  <div className="flex flex-col items-center space-y-4 min-h-screen">
    <div>
      <AddCourseForm id={school.id} schoolName={school.name} addCourse={addCourse}/>
    </div>
  </div>
);
}