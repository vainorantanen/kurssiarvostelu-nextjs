import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Poistettu onnistuneesti!</h1>
      <Link
        href="/"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
      >
        Siirry etusivulle
      </Link>
    </div>
  );
}
