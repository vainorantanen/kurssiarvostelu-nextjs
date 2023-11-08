"use client"

import { useRouter } from "next/navigation";

type ConfirmEmailProps = {
  userId: string;
  token: string
}

export default function ConfirmEmailButton({ userId, token }: ConfirmEmailProps) {
  const router = useRouter();

  const handleConfirm = async (e: any) => {
    e.preventDefault();

    try {
      const confirmRes = await fetch('/api/confirmEmail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, token }),
      })

      if (confirmRes.ok) {
        router.push('/login')
      }
    } catch (error) {
      console.log("Error during confirmation: ", error);
    }
  } 
  
  return (
    <div>
      <button
      className="bg-blue-500 text-white font-semibold my-3 py-2 px-4 rounded hover:bg-blue-600"
      onClick={handleConfirm}>Vahvista sähköposti</button>
    </div>
  )
}