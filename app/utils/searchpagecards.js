import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function Searchpagecards({ element }) {
  const imggurl = element?.snippet.channelId;
  const [url, seturl] = useState("");
  const [dataloaded, setdataloaded] = useState(false);
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  useEffect(() => {
    const fetchurl = async () => {
      setdataloaded(false);
      try {
        const data = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id=${imggurl}&key=AIzaSyBqNyWRHcSbFuCkTfY-p6ZMM_QRON-j00I`
        );
        seturl(data.data.items[0].snippet.thumbnails.default.url);
        setdataloaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchurl();
  }, []);

  return (
    <div className="w-full">
      {/*for mobile devices*/}
      <section className="lg:hidden md:hidden">
        <Link className="flex w-full" href={`/watch?q=${element?.id?.videoId}`}>
          <section className="lg:hidden">
            <img
              className="w-80 h-54"
              alt="thumbnail"
              src={element?.snippet?.thumbnails?.medium?.url}
            />
            <h2 className="text-[#ffffffd4] sm:text-xs">
              {element?.snippet?.title}
            </h2>
            <span className="flex justify-between items-center sm:text-xs text-sm">
              <p className="text-sm text-yellow-700">
                <span className="flex justify-center ">
                  <img
                    src={url}
                    className="rounded-full"
                    height={10}
                    width={30}
                  />
                  <b className="mt-1 ml-3">{element?.snippet?.channelTitle}</b>
                </span>
              </p>
              <b className="text-[#ffffffab] sm:text-xs text-sm">
                {formatDate(element?.snippet?.publishTime)}
              </b>
            </span>
          </section>
        </Link>
      </section>
      {/*for desktop others devices*/}
      <section className="hidden lg:flex md:flex w-full s">
        <Link
          className="flex w-full cursor-pointer"
          href={`/watch?q=${element?.id?.videoId}`}
        >
          <div className="w-96 h-60 object-contain">
            <img
              className="w-full h-full"
              alt="thumbnail"
              src={element?.snippet?.thumbnails?.high?.url}
            />
          </div>

          <div className="bg-[#0000009f] w-full">
            <h2 className="text-[#ffffffd4] mt-7 text-2xl pl-5 pr-5">
              {element?.snippet?.title}
            </h2>
            <span className="flex justify-between  mt-16 pl-5 pr-5 sm:text-xs text-sm">
              <p className="text-xl text-yellow-700">
                <span className="flex justify-center ">
                  <b className="mt-2 ml-3">{element?.snippet?.channelTitle}</b>
                </span>
              </p>
              <b className="text-[#ffffffab] w-32  text-sm">
                published on:
                <br />
                {formatDate(element?.snippet?.publishTime)}
              </b>
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}

export default Searchpagecards;
