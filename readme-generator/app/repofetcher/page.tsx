"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

export default function RepoFetcherPage() {
  const { getToken } = useAuth();
  const [repoUrl, setRepoUrl] = useState("");
  const [result, setResult] = useState<any>(null);

  async function handleFetch() {
    const token = await getToken();
    const res = await fetch("http://localhost:4000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ repoUrl }),
    });
    const data = await res.json();
    setResult(data);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Repo Fetcher</h1>
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="Enter GitHub repo URL"
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={handleFetch}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Fetch Repo
      </button>
      {result && (
        <pre className="mt-6 bg-gray-100 p-4 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
