import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Arvostelu poistettu onnistuneesti!</h1>
      <Link
        href="/"
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      >
        Siirry etusivulle
      </Link>
    </div>
  );
}
