import React from "react";
import Image from "next/image";
import CopyrightIcon from "@mui/icons-material/Copyright";
function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div
      style={{ position: "fixed", bottom: "0" }}
      className="w-full row-auto bg-[#05050d]  underline-offset-1"
    >
      <div className="w-full flex justify-between items-center">
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
        <div>
          <CopyrightIcon style={{ color: "white" }} />
          <b style={{ color: "white" }}>{year}</b>
        </div>
        <h2
          className="text-xl font-bold
        bg-clip-text text-transparent bg-gradient-to-r from-[#0800ff] to-[#5853ed]"
        >
          Shaik Firoz
        </h2>
      </div>
    </div>
  );
}

export default Footer;
