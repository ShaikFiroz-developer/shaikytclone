"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import speechrecog from "@/util/speecgrecognition";
import { useRouter } from "next/navigation";
import { Cancel } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "@/app/auth";
import { useContext } from "react";

function Header1() {
  const router = useRouter();

  const { isAuthenticated, signOut } = useContext(AuthContext);
  const [changeInputText, setChangeInputText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [speech, setSpeechRecog] = useState(false);
  const [imgclicked, setImgClickedState] = useState(false);

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

  const signIn = () => {
    router.push("/signin");
  };

  const signuut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div
      style={{ zIndex: 102 }}
      className="fixed top-0 w-full flex justify-between items-center  bg-[#121212] border-y-zinc-300"
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
          className="fixed top-0 flex justify-center items-center"
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

      <section className="w-[4/12] flex justify-between items-center">
        <Image
          className="hidden sm:block"
          src="/logo.svg"
          height={35}
          width={70}
          alt="yt logo"
        />
        <Image
          className="block sm:hidden"
          src="/logo.svg"
          height={30}
          width={60}
          alt="yt logo"
        />
      </section>
      <section className="w-7/12 flex items-center justify-center ">
        <form
          onSubmit={handleSubmit}
          className={`flex justify-between w-full  ${
            isAuthenticated ? "bg-[#212121]" : "bg-gray-700"
          } p-1 h-10 items-center rounded-lg  `}
        >
          <input
            type="text"
            className={`${
              isAuthenticated
                ? "bg-[#212121] text-white"
                : "bg-gray-700 text-gray-400"
            } h-7 w-11/12 focus:outline-none`}
            placeholder={
              isAuthenticated
                ? "Search anything.."
                : "Sign in to use the search feature"
            }
            id="searchinputbox"
            autoComplete="off"
            value={changeInputText}
            onChange={(e) => setChangeInputText(e.target.value)}
            disabled={!isAuthenticated}
          />
          <button
            type="submit"
            disabled={!isAuthenticated}
            style={{ cursor: isAuthenticated ? "pointer" : "not-allowed" }}
          >
            <SearchIcon style={{ color: isAuthenticated ? "white" : "gray" }} />
          </button>
        </form>
        <div
          style={{
            cursor: isAuthenticated ? "pointer" : "not-allowed",
            marginLeft: "10px",
          }}
          className="flex justify-center items-center"
        >
          <KeyboardVoiceIcon
            style={{ color: isAuthenticated ? "white" : "gray" }}
            onClick={isAuthenticated ? handleSpeechRecognition : null}
          />
        </div>
      </section>

      <section className="flex w-2/12  items-center space-x-3">
        {isAuthenticated ? (
          <div className="flex items-center w-full justify-between  space-x-3">
            <h3 className="text-white font-medium">
              👋 {localStorage.getItem("name")}
            </h3>
            <button
              style={{ fontFamily: "monospace" }}
              className="w-2/5 h-10 sm:block text-black p-1 rounded-lg bg-white font-bold text-xl hover:bg-[#0800ff]"
              type="button"
              onClick={signuut}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            style={{ fontFamily: "monospace" }}
            className="w-full h-10 sm:block text-black p-1 rounded-lg bg-white font-bold text-xl hover:bg-[#0800ff]"
            type="button"
            onClick={signIn}
          >
            Sign In
          </button>
        )}
      </section>
    </div>
  );
}

export default Header1;
