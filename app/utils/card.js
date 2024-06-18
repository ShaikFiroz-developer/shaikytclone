import React from "react";
import Image from "next/image";
import Link from "next/link";

function Card({ element }) {
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <Link href={`/watch?q=${element?.id?.videoId}`}>
      <section className=" lg:bg-[#00000099] w-80 ld:w-96 min-h-56 h-auto border-blue-50 rounded-lg mb-5 text-white">
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
  );
}

export default Card;
