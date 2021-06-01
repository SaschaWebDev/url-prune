import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>URL Prune</title>
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
              <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:self-center">
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">Selected URL [{id}]</span>
                    <span className="block text-red-900">Prune them now!</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-orange-50">
                    Life is too short to deal with URLs longer than terms of
                    services. Prune them before sharing them with friends.
                  </p>
                  <a
                    href="#"
                    className="mt-8 bg-orange-100 border border-transparent rounded-md shadow py-3 px-6 inline-flex items-center text-base font-medium text-red-600 hover:text-red-500"
                  >
                    Enter ridiculously long URL
                  </a>
                </div>
              </div>
              <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1 opacity-25">
                <img
                  className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                  src="./url.svg"
                  alt="URL icon"
                />
              </div>
            </div>
          </div>

          <div className="mx-auto flex flex-col justify-center">
            <h1>Most Recent Prunes:</h1>
            <Link href="/all-urls">
              <a>See all Prunes</a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
