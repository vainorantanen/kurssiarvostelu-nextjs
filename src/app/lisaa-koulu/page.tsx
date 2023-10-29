import prisma from "@/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

async function addSchool(data: FormData) {
    "use server"

    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      throw new Error("Sinun tulee kirjautua sisään lisätäksesi arvostelu")
    }

    const name = data.get("schoolname")?.valueOf()
    if (typeof name !== "string" || name.length === 0) {
        throw new Error("Invalid schoolname")
      }
  
      // luodaan relaatio käyttäjän uniikin sähköpostin perusteella
    await prisma.school.create({ data: { name } })
    redirect('/kiitos-koulun-lisaamisesta')
}

export default function AddNewReview() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-4xl font-bold">Lisää uusi koulu</h1>
      <form action={addSchool} className="flex items-center space-x-2">
        <textarea
          name="schoolname"
          className="px-3 py-2 border rounded w-64 shadow focus:outline-none text-black"
          placeholder="Kirjoita koulun nimi tähän"
          rows={4} // Adjust the number of rows as needed
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Lisää
        </button>
      </form>
    </div>
  );
}
