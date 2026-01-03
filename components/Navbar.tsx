import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="z-10 backdrop-blur-md shadow-md text-textColor font-bold h-14 md:h-18 flex justify-center px-10 py-1 items-center absolute top-0 w-full">
      <Link href={"/"} className="flex h-full items-center gap-2">
        <img
          src="collegeLogoDarkBlue.webp"
          alt="college logo"
          className="h-full"
        />
        <div className="flex-col text-md md:text-lg text-[#166be2] justify-center">
          <h1>College Of Engineering</h1>
          <h1>Cherthala</h1>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
