import prisma from "@/db"
import { redirect } from "next/navigation"

async function addReview(data: FormData) {
    "use server"

    const description = data.get("description")?.valueOf()
    if (typeof description !== "string" || description.length === 0) {
        throw new Error("Invalid description")
      }
    
    await prisma.review.create({ data: { description } })
    redirect('/kiitos-arvostelusta')
}

export default function AddNewReview() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-4xl font-bold">Lisää uusi arvostelu</h1>
      <form action={addReview} className="flex items-center space-x-2">
        <textarea
          name="description"
          className="px-3 py-2 border rounded w-64 shadow focus:outline-none text-black"
          placeholder="Kirjoita arvostelu tähän"
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
