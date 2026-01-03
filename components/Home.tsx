import React from "react";
import HomeButton from "./HomeButton";
import * as motion from "motion/react-client";
import { FaRankingStar } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-16 bg-white w-full overflow-hidden flex flex-col justify-center">
      <div className="relative z-1 py-8 h-full lg:pt-18 flex flex-col-reverse lg:flex-row justify-between items-center w-full max-w-7xl mx-auto">
        <motion.div
          className="w-full lg:w-1/2 px-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
            <span className="block">Begin Your Journey at</span>
            <span className="text-[#8C8DEC]">COE Cherthala</span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-lg">
            Join the prestigious College of Engineering Cherthala and unlock
            your potential in the world of technology and innovation. Start your
            application right now.
          </p>

          <motion.div
            className="py-4 w-fit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
          >
            <HomeButton />
          </motion.div>

          <div className="mt-8 flex items-center">
            <div className="flex items-center gap-1">
              <FaRankingStar color="blue" />
              <span className="text-gray-700">
                Ranked 10th among all engineering institutions across Kerala.
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="w-full lg:w-1/2 h-fit lg:h-full flex justify-center items-center p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-xl">
            <img
              src="/h1.webp"
              alt="College of Engineering Cherthala campus"
              className="w-full h-auto object-cover"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md hidden lg:block"
            >
              <div className="text-[#8C8DEC] font-bold text-lg">
                2025 Admissions Open
              </div>
              <div className="text-gray-600 text-sm">Join Now</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
