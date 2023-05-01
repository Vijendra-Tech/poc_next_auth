"use client";

import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const navigateToogin = () => {
    router.push("/login");
  };

  const getGuthubFiles = async () => {
    router.push("/sources");
  };

  return (
    <div className="flex min-h-screen flex-col justify-between items-center">
      <div className="mt-32 text-center lg:mb-0 lg:grid-cols-1 lg:text-left bg-white rounded-md grid gap-1">
        <a
          onClick={() => navigateToogin()}
          className="cursor-pointer group rounded-lg border border-transparent px-5 py-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Login{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none cursor-pointer">
              -&gt;
            </span>
          </h2>
        </a>
        <button
          onClick={() => getGuthubFiles()}
          className="w-56 rounded focus:translate-x-0 hover:border-green-200 bg-green-300"
        >
          Fetch Github files
        </button>
      </div>
    </div>
  );
}
