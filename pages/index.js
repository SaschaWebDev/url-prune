import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Typical from "react-typical";
import isUrl from "is-url";
import { nanoid } from "nanoid";

export default function Home() {
  const router = useRouter();
  const [showURLInput, setshowURLInput] = useState(false);
  const [clipBoardInserted, setClipBoardInserted] = useState(false);
  const [urlInputText, setUrlInputText] = useState("");
  const [prunedUrlInputText, setPrunedUrlInputText] = useState("");
  const [alertSuccessURLPruned, setAlertSuccessURLPruned] = useState(false);
  const [recentPrunes, setRecentPrunes] = useState("");
  const [tempText, setTempText] = useState("");
  const [tempTextIndex, setTempTextIndex] = useState("");

  function handleSwitchToUrlInput() {
    setshowURLInput(true);
    navigator.clipboard
      .readText()
      .then((clipboardText) => {
        if (clipboardText && !clipBoardInserted) {
          if (validateURl(clipboardText)) {
            setUrlInputText(clipboardText);
            setClipBoardInserted(true);
            setPrunedUrlInputText("test");
          }
        }
      })
      .catch((err) => {
        console.log(
          "This app needs access to the clipboard for some features."
        );
      });
    // On click auf url open new tab aber wenn url direkt aufgerufen wird dann einfach redirect im  selben tab
    /* try {
      const clipBoardUrl = e.clipboardData.getData("Text");
      console.log("CLIP: ", clipBoardUrl);
    } catch (err) {
      console.log("ERR ", err);
    } */
  }

  function validateURl(given_url) {
    let parsedUrl = given_url;

    if (parsedUrl.includes("www.")) {
      parsedUrl = parsedUrl.replace("www.", "");
    }

    if (parsedUrl.includes("http://")) {
      parsedUrl = parsedUrl.replace("http://", "https://");
    }

    if (!parsedUrl.includes("https://")) {
      parsedUrl = "https://" + parsedUrl;
    }

    if (parsedUrl && isUrl(parsedUrl)) {
      return parsedUrl;
    }
    return null;
  }

  function onChange(event) {
    setUrlInputText(event.target.value);
  }

  function fetchRecentPrunes(recentUserId) {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}` + "/v1/urls/history", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recentUserId: recentUserId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log("GOT PRUNES: ", json);
            setRecentPrunes(json.foundPrunes);
          });
        } else {
          console.log("REQUEST FAILED");
        }
      })
      .catch((error) => {
        console.log("FAILED");
      });
  }

  function checkOrSetRecentUser() {
    if (localStorage.getItem("recentUserId") === null) {
      localStorage.setItem("recentUserId", nanoid(256));
    } else {
      fetchRecentPrunes(localStorage.getItem("recentUserId"));
    }
  }

  useEffect(() => {
    checkOrSetRecentUser();
  }, []);

  return (
    <div>
      <Head>
        <title>URL Prune</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {alertSuccessURLPruned ? (
        <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
          {/*
          Notification panel, show/hide based on alert state.

          Entering: "transform ease-out duration-300 transition"
      From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      To: "translate-y-0 opacity-100 sm:translate-x-0"
          Leaving: "transition ease-in duration-100"
      From: "opacity-100"
      To: "opacity-0"
        */}
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {/* Heroicon name: check-circle */}
                  <svg
                    className="h-6 w-6 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">
                    Successfully saved!
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Anyone with a link can now view this file.
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Close</span>
                    {/* Heroicon name: x */}
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

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
                    <span className="block select-none">
                      Your URLs are too long?
                    </span>
                    <span className="block text-red-900 select-none">
                      Prune them now!
                    </span>
                  </h2>
                  {/* <p className="mt-4 text-lg leading-6 text-orange-50">
                    Life is too short to deal with URLs longer than terms of
                    services. Prune them before sharing them with friends.
                  </p> */}
                  {/*                   <a
                    href="#"
                    className="mt-8 bg-orange-100 border border-transparent rounded-md shadow py-3 px-6 inline-flex items-center text-base font-medium text-red-600 hover:text-red-500"
                  >
                    Enter ridiculously long URL
                  </a> */}
                  {/* className="mt-8 bg-orange-100 border border-transparent rounded-md shadow py-3 px-6 inline-flex items-center text-base font-medium text-red-600 hover:text-red-500" */}
                  <div
                    className={`mt-2 ${
                      showURLInput ? "cursor-text" : "cursor-pointer"
                    }`}
                    style={{
                      background: "rgba(255,255,255, 0.1)",
                      padding: "1.5em",
                      borderRadius: "0.375rem",
                      position: "relative",
                      zIndex: "1",
                      backgroundFilter: "blur(40px)",
                      border: "solid 2px transparent",
                      backgroundClip: "padding-box",
                      boxShadow: "10px 10px 10px rgba(46,54,68,0.03)",
                    }}
                    onClick={() => handleSwitchToUrlInput()}
                  >
                    {showURLInput ? (
                      <input
                        id="url-iput"
                        type="text"
                        name="url"
                        placeholder=""
                        autoFocus
                        className="text-xl text-white font-bold border-none outline-none truncate w-full bg-transparent"
                        onChange={onChange}
                        value={urlInputText}
                        spellCheck="false"
                      ></input>
                    ) : (
                      <Typical
                        id="cta-input"
                        className="font-bold text-xl text-white "
                        steps={["Enter a ridiculously long URL", 1000]}
                        loop={Infinity}
                      >
                        Enter ridiculously long URL
                      </Typical>
                    )}
                  </div>

                  {prunedUrlInputText ? (
                    <div
                      className={`mt-2`}
                      style={{
                        background: "rgba(255,255,255, 0.1)",
                        padding: "1.5em",
                        borderRadius: "0.375rem",
                        position: "relative",
                        zIndex: "1",
                        backgroundFilter: "blur(40px)",
                        border: "solid 2px transparent",
                        backgroundClip: "padding-box",
                        boxShadow: "10px 10px 10px rgba(46,54,68,0.03)",
                      }}
                      onClick={() => handleSwitchToUrlInput()}
                    >
                      <h1>{prunedUrlInputText}</h1>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1 opacity-25 select-none">
                <img
                  className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20 select-none"
                  src="./url.svg"
                  alt="URL icon"
                />
              </div>
            </div>
          </div>
          {recentPrunes &&
          recentPrunes.length > 0 &&
          typeof window !== "undefined" ? (
            <div className="mx-auto flex flex-col justify-center mt-4">
              <h2 className="text-center text-xl font-extrabold text-white mb-2">
                <span className="block text-orange-500 select-none">
                  Your Most Recent Prunes:
                </span>
              </h2>
              {recentPrunes.map((prune, index) => (
                <div key={index} className="text-center mb-4 mx-auto">
                  <div className="grid grid-cols-4 gap-0 grid-flow-row auto-rows-max">
                    <div className="grid grid-cols-2">
                      <img
                        className="select-non w-8 h-8 mt-1"
                        src="./view-symbol.svg"
                        alt="view icon"
                        style={{ paddingTop: "0.6em" }}
                      />
                      <div className="mr-4" style={{ paddingTop: "0.6em" }}>
                        {prune.view_count}
                      </div>
                    </div>

                    <div
                      className="mr-4 cursor-pointer"
                      style={{
                        background: "rgba(251, 146, 60, 0.1)",
                        padding: "0.5em",
                        borderRadius: "0.375rem",
                        position: "relative",
                        zIndex: "1",
                        backgroundFilter: "blur(40px)",
                        border: "solid 2px transparent",
                        backgroundClip: "padding-box",
                        boxShadow: "10px 10px 10px rgba(46,54,68,0.03)",
                      }}
                      onMouseOver={() => {
                        setTempText("Click to Copy");
                        setTempTextIndex(index);
                      }}
                      onMouseLeave={() => {
                        setTempText("");
                        setTempTextIndex("");
                      }}
                      onClick={() =>
                        navigator.clipboard.writeText(recentPrunes[index].url)
                      }
                    >
                      {tempText && tempTextIndex === index
                        ? tempText
                        : prune.url.length > 64
                        ? prune.url.substring(0, 64 - 3) + "..."
                        : prune.url}
                    </div>
                    <div
                      className="w-4 h-4 mr-4"
                      style={{ paddingTop: "1em", maxWidth: "2rem" }}
                    >
                      <img
                        className="select-non"
                        src="./right-arrow.svg"
                        alt="view icon"
                      />
                    </div>
                    <div
                      className="mr-2 cursor-pointer"
                      style={{
                        background: "rgba(251, 146, 60, 0.1)",
                        padding: "0.5em",
                        borderRadius: "0.375rem",
                        position: "relative",
                        zIndex: "1",
                        backgroundFilter: "blur(40px)",
                        border: "solid 2px transparent",
                        backgroundClip: "padding-box",
                        boxShadow: "10px 10px 10px rgba(46,54,68,0.03)",
                      }}
                      onMouseOver={() => {
                        setTempText("Click to Copy");
                        setTempTextIndex("m_" + index);
                      }}
                      onMouseLeave={() => {
                        setTempText("");
                        setTempTextIndex("");
                      }}
                      onClick={() =>
                        navigator.clipboard.writeText(
                          window.location.href +
                            router.pathname.substring(
                              1,
                              router.pathname.length
                            ) +
                            prune.mapped_url
                        )
                      }
                    >
                      {tempText && tempTextIndex === "m_" + index
                        ? tempText
                        : window.location.href +
                          router.pathname.substring(1, router.pathname.length) +
                          prune.mapped_url}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    </div>
  );
}
