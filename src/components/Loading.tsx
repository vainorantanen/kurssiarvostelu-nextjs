export default function Loading() {
    return (
      <div className="flex items-center justify-center">
        <div className="border-t-4 border-white border-solid rounded-full h-8 w-8 animate-spin"></div>
        <p className="ml-2 text-white text-xl">Ladataan...</p>
      </div>
    );
  }