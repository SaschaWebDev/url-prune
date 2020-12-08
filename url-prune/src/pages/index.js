import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>URL Prune</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col justify-center">
        <h1 className="mx-auto text-4xl font-bold">URL Prune!</h1>
      </main>
    </div>
  );
}
