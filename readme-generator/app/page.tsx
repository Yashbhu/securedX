import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to RepoFetcher 🚀</h1>
      <p className="text-gray-600 mb-6">
        Sign in to start fetching your GitHub repositories.
      </p>

      <Link
        href="/repofetcher"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
      >
        Go to RepoFetcher
      </Link>
    </main>
  );
}
