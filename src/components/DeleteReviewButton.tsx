"use client"

type DeleteReviewProps = {
    id: string
    deleteReview: (id: string) => Promise<void>;
  }

export default function DeleteReviewButton({ id, deleteReview }: DeleteReviewProps) {
  
  return (
    <div>
      <button
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      onClick={() => deleteReview(id)}>Poista</button>
    </div>
  )
}