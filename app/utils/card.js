import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "../auth";
import { useContext } from "react";

function Card({ element }) {
  const { isAuthenticated } = useContext(AuthContext);
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return isAuthenticated ? (
    <Link href={`/watch?q=${element?.id?.videoId}`}>
      <section className="lg:bg-[#00000099] w-80 ld:w-96 min-h-56 h-auto border-blue-50 rounded-lg mb-5 text-white cursor-pointer">
        <img
          className="w-full h-60"
          alt="thumbnail"
          src={element?.snippet?.thumbnails?.high?.url}
        />
        <h2 className="text-[#ffffffd4] sm:text-xs">
          {element?.snippet?.title}
        </h2>
        <span className="flex justify-between sm:text-xs text-sm">
          <b className="sm:text-xs text-sm">{element?.snippet?.channelTitle}</b>
          <b className="text-[#ffffffab] sm:text-xs text-sm">
            {formatDate(element?.snippet?.publishTime)}
          </b>
        </span>
      </section>
    </Link>
  ) : (
    <section
      className="lg:bg-[#00000099] w-80 ld:w-96 min-h-56 h-auto border-blue-50 rounded-lg mb-5 text-white cursor-not-allowed"
      onClick={() => alert("Sign in to watch the video!")}
    >
      <img
        className="w-full h-60 opacity-50"
        alt="thumbnail"
        src={element?.snippet?.thumbnails?.high?.url}
      />
      <h2 className="text-[#ffffff75] sm:text-xs">{element?.snippet?.title}</h2>
      <span className="flex justify-between sm:text-xs text-sm">
        <b className="sm:text-xs text-sm text-[#ffffff75]">
          {element?.snippet?.channelTitle}
        </b>
        <b className="text-[#ffffff40] sm:text-xs text-sm">
          {formatDate(element?.snippet?.publishTime)}
        </b>
      </span>
    </section>
  );
}

export default Card;
