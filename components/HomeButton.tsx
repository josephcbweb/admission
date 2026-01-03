"use client";
import { motion, scale } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";

const HomeButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="">
      <Link href={"form"}>
        <motion.button
          animate={isHovered ? { scale: 1.05, color: "#8C8DEC" } : { scale: 1 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileTap={{ scale: 0.9 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
          }}
          className="rounded-full px-4 py-2 text-primaryAccent text-2xl border-2 cursor-pointer"
        >
          Admission Form
        </motion.button>
      </Link>
    </div>
  );
};

export default HomeButton;
