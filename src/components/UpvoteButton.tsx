"use client"

import { FaThumbsUp } from "react-icons/fa";

type UpvoteReviewProps = {
    schoolId: string;
    reviewId: string;
    upvoteReview: (schoolId: string, reviewId: string) => Promise<void>;
  }

export default function UpvoteButton({ schoolId, reviewId, upvoteReview }: UpvoteReviewProps) {
  
  return (
    <div>
      <button
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
      onClick={() => upvoteReview(schoolId, reviewId)}
      >
        <span className="mr-2">Tykkää</span>
        <FaThumbsUp />
      </button>
    </div>
  )
}