"use client"

import Link from "next/link"

type ReviewBoxProps = {
  id: string
  description: string
}

export default function ReviewBox({ id, description }: ReviewBoxProps) {
  return (
    <div className="flex gap-1 items-center">
      <Link href={`/kurssit/${id}`}>
        <p>{description}</p>
      </Link>
    </div>
  )
}
