import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>URL Prune - All URLs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col justify-center">
        <div className="relative">
          <div className="absolute inset-0 flex flex-col" aria-hidden="true">
            <div className="flex-1" />
            <div className="flex-1" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
              <h1>TEST</h1>
              <Link href="/">
                <a>Go to first page!</a>
              </Link>
            </div>
          </div>

          <div className="mx-auto flex flex-col justify-center">
            <h1>Most Recent Prunes:</h1>
          </div>
        </div>
      </main>
    </div>
  );
}
