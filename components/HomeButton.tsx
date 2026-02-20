"use client";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

const HomeButton = ({
  isAdmissionOpen = true,
  isLoading = false
}: {
  isAdmissionOpen?: boolean;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return (
      <motion.button
        className="
          relative inline-flex items-center justify-center gap-3 px-8 py-4 
          text-lg font-bold text-black/40 bg-gray-200 rounded-full 
          cursor-wait
          transition-all duration-300
        "
      >
        <span className="relative z-10 flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-black/20 border-t-black/60 rounded-full animate-spin" />
          Checking...
        </span>
      </motion.button>
    );
  }

  if (!isAdmissionOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="
          relative inline-flex items-center justify-center gap-3 px-8 py-4 
          text-lg font-bold text-black/40 bg-gray-200 rounded-full 
          cursor-not-allowed
          transition-all duration-300
        "
      >
        <span className="relative z-10">Admissions Closed</span>
      </motion.button>
    )
  }

  return (
    <Link href={"form"}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
          relative inline-flex items-center justify-center gap-3 px-8 py-4 
          text-lg font-bold text-black bg-[#ccff00] rounded-full 
          shadow-[0_0_20px_rgba(204,255,0,0.4)]
          hover:shadow-[0_0_30px_rgba(204,255,0,0.6)]
          transition-all duration-300
        "
      >
        <span className="relative z-10">Apply For Admission</span>
        <FaArrowRight className="relative z-10" />
      </motion.button>
    </Link>
  );
};

export default HomeButton;
