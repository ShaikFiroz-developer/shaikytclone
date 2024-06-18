"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import speechrecog from "@/util/speecgrecognition";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Cancel } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header1() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [changeInputText, setChangeInputText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [speech, setSpeechRecog] = useState(false);
  const [imgclicked, setimgclickedstate] = useState(false);
  const [searchreq, setsearchreq] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (changeInputText.trim() !== "") {
      router.push(`/search?q=${changeInputText}`);
    }
  };

  useEffect(() => {
    if (inputValue.trim() !== "") {
      router.push(`/search?q=${inputValue}`);
    }
  }, [inputValue]);

  const handleSpeechRecognition = () => {
    setSpeechRecog(true);
    speechrecog(true, (input) => {
      setInputValue(input);
      setChangeInputText(input); // Update the input text state
      setSpeechRecog(false);
    });
  };

  const handleUnauthenticated = () => {
    if (status === "unauthenticated") {
      toast("Please signin to use search feature!");
    }
  };

  return (
    <div
      style={{ zIndex: 102 }}
      className="fixed top-0 w-full bg-[#121212] border-y-zinc-300"
      onMouseMoveCapture={() => {
        setSpeechRecog(false);
      }}
    >
      {
        <div style={{ position: "fixed", opacity: "100" }}>
          <ToastContainer theme="dark" />
        </div>
      }
      {speech && (
        <div
          className="fixed flex justify-center items-center"
          style={{ width: "100vw", height: "100vh", zIndex: 103 }}
        >
          <section
            style={{ zIndex: 104 }}
            className="bg-black flex justify-center items-center w-52 h-32 opacity-100 text-white font-extrabold"
          >
            <KeyboardVoiceIcon style={{ color: "white" }} />
            <h2>Listening...</h2>
          </section>
        </div>
      )}

      {session && imgclicked && (
        <div
          className="fixed flex justify-center items-center"
          style={{ width: "100vw", height: "100vh", zIndex: 103 }}
        >
          <section
            style={{ zIndex: 104 }}
            className="bg-black flex justify-center items-center w-fit p-5 min-h-fit opacity-100 text-white font-extrabold"
          >
            <ul className="flex bg-black flex-col justify-start items-start">
              <li className="flex w-full justify-center items-center">
                <span>
                  <span className="flex">
                    <img
                      width={70}
                      height={70}
                      className="rounded-lg cursor-pointer"
                      src={`${session?.user?.img}`}
                    />
                    <div
                      onClick={() => {
                        setimgclickedstate(!imgclicked);
                      }}
                    >
                      <Cancel
                        style={{
                          position: "relative",
                          top: "0",
                          marginLeft: "150px",
                          color: "red",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </span>
                  <button
                    style={{ fontFamily: "monospace", marginRight: "5px" }}
                    className="hidden sm:block text-black p-1 rounded-lg bg-white font-bold text-xl hover:bg-[#0800ff]"
                    type="button"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </span>
              </li>
              <li className="w-full justify-between items-center">
                <b>Hi!</b> <p>{session?.user?.name}</p>
              </li>
              <li>Hope you Have a Good Day! 😊</li>
            </ul>
          </section>
        </div>
      )}

      <section className="w-full flex justify-between items-center">
        <Image
          className="hidden sm:block"
          src="/logo.svg"
          height={35}
          width={70}
          alt="yt logo"
        />
        {/* This image will appear only on small screens */}
        <Image
          className="block sm:hidden"
          src="/logo.svg"
          height={30}
          width={60}
          alt="yt logo"
        />
        <section className="w-8/12 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex justify-between bg-[#212121] p-1 h-10 items-center rounded-lg sm:w-2/4 w-11/12"
            onMouseEnter={handleUnauthenticated}
          >
            <input
              type="text"
              className="bg-[#212121] text-white h-7 w-11/12 focus:outline-none"
              placeholder="Search anything.."
              id="searchinputbox"
              autoComplete="off"
              value={changeInputText} // Bind the input value to the state
              onChange={(e) => setChangeInputText(e.target.value)}
              disabled={!session} // Disable search if not signed in
            />
            <button type="submit" disabled={!session}>
              <SearchIcon style={{ color: "white" }} />
            </button>
          </form>
          <div
            onClick={session && handleSpeechRecognition}
            style={{ cursor: "pointer" }}
          >
            <KeyboardVoiceIcon style={{ color: "white" }} />
          </div>
        </section>
        <section>
          {session ? (
            <div className="hidden lg:flex md:flex items-center">
              <img
                className="mr-2 rounded-lg cursor-pointer"
                width={30}
                height={30}
                onClick={() => {
                  setimgclickedstate(!imgclicked);
                }}
                src={session.user.img}
                alt="User Profile"
              />
            </div>
          ) : (
            <button
              style={{ fontFamily: "monospace", marginRight: "5px" }}
              className="hidden w-full h-10 sm:block text-black p-1 rounded-lg bg-white font-bold text-xl hover:bg-[#0800ff]"
              type="button"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )}
          <div className="lg:hidden md:hidden">
            {session ? (
              <img
                className="mr-2 rounded-lg"
                width={30}
                height={30}
                onClick={() => {
                  setimgclickedstate(!imgclicked);
                }}
                src={session.user.img}
                alt="User Profile"
              />
            ) : (
              <button
                style={{ fontFamily: "monospace", marginRight: "5px" }}
                className="lg:hidden md:hidden text-black p-1 rounded-lg bg-white font-bold text-sm hover:bg-red-500"
                type="button"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}

export default Header1;
