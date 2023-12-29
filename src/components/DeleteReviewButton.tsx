"use client"

import { FaTrash } from "react-icons/fa";

type DeleteReviewProps = {
    id: string
    deleteReview: (id: string) => Promise<void>;
  }

export default function DeleteReviewButton({ id, deleteReview }: DeleteReviewProps) {
  
  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center"
        onClick={() => deleteReview(id)}
      >
        <span className="mr-2">Poista</span>
        <FaTrash />
      </button>
    </div>
  )
}