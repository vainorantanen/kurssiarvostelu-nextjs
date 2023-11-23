"use client"

import { useRouter } from "next/navigation"

export default function BackButton() {

    const router = useRouter()

    if (!router) {
        return null
    }

    const handleBack = () => {
        router.back()
    }

    return (
        <button
        onClick={handleBack}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
              Takaisin
            </button>
    )
}