"use client"

import Link from "next/link"

type SingleReviewProps = {
    id: string
    description: string
    deleteReview: (id: string) => void
  }

export default function SingleReview({ id, description, deleteReview }: SingleReviewProps) {
  return (
    <div>
            <Link href="/kurssit" className="text-blue-500 hover:underline">
        Takaisin
      </Link>
      <h1 className="text-2xl font-bold my-4">Yksittäinen arvostelu</h1>
      <p>{description}</p>
      <button onClick={() => deleteReview(id)}>Poista</button>
    </div>
  )
}