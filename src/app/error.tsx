"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-red-500 mb-4">
        Une erreur est survenue !
      </h2>
      <p className="text-gray-400 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        Réessayer
      </button>
    </div>
  );
}
