"use client"

type DeleteReviewProps = {
    id: string
    deleteReview: (id: string) => void
  }

export default function DeleteReviewButton({ id, deleteReview }: DeleteReviewProps) {
  return (
    <div>
      <button onClick={() => deleteReview(id)}>Poista</button>
    </div>
  )
}