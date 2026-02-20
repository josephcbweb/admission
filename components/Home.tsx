"use client";
import React, { useRef, useState, useEffect } from "react";
import HomeButton from "./HomeButton";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { FaArrowRight, FaRankingStar, FaGlobe, FaBolt } from "react-icons/fa6";
import { admissionStats } from "../utilities/stats-data";

// --- Components ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const BentoCard = ({
  children,
  className = "",
  dark = false,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`
        relative overflow-hidden rounded-[2rem] p-8 md:p-10
        ${dark ? "bg-[#1a1917] text-[#fbfbf6]" : "bg-[#efede6] text-[#1a1917]"}
        ${className}
      `}
    >
      {/* Border Glow Effect - Simulated with box-shadow for performance or simple div */}
      <div className="absolute inset-0 border border-black/5 rounded-[2rem] pointer-events-none" />
      {children}
    </motion.div>
  );
};

const MicroLabel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2 flex items-center gap-2 ${className}`}>
    <div className="w-1.5 h-1.5 rounded-full bg-current" />
    {children}
  </div>
);

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-[#ccff00] rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    />
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Small delay to prevent flickering if response is too fast
        const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
        const request = fetch("/api/admission/status");

        const [_, res] = await Promise.all([minLoadTime, request]);

        if (res.ok) {
          const data = await res.json();
          // Check if any program is open
          const isOpen = Object.values(data.admissionsOpen || {}).some(
            (program: any) => program.open
          );
          setIsAdmissionOpen(isOpen);
        }
      } catch (error) {
        console.error("Failed to fetch admission status", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatus();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fbfbf6] text-[#1a1917] selection:bg-[#ccff00] selection:text-black font-sans">
      <NoiseOverlay />
      <CustomCursor />

      {/* Decorative Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-20 min-h-screen flex flex-col justify-center">

        {/* Header Section */}
        <motion.header
          className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1a1917]/10 pb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <div className="font-mono text-sm md:text-base uppercase tracking-widest opacity-80 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-current" />
              College of Engineering Cherthala
            </div>
            <h1 className="text-7xl md:text-[8rem] leading-[0.85] font-serif tracking-tight -ml-1 md:-ml-2">
              Future <br />
              <span className="italic font-light opacity-50">Proof.</span>
            </h1>
          </div>
          <div className="mb-4">
            <div className="w-24 h-24 rounded-full bg-[#ccff00] flex items-center justify-center animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text className="text-[14px] font-mono font-bold uppercase tracking-widest">
                  <textPath xlinkHref="#curve">
                    Admissions Open • {currentYear} •
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </motion.header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 h-auto lg:h-[650px]">

          {/* 1. Main Content Card (Large) */}
          <BentoCard className="md:col-span-6 lg:col-span-8 flex flex-col justify-between group relative overflow-hidden" delay={0.1}>
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-10 transition-opacity">
              <FaGlobe size={200} />
            </div>

            <div className="relative z-10 max-w-xl">
              <MicroLabel>The Mission</MicroLabel>
              <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-6">
                Engineering the next generation of <span className="border-b-4 border-[#ccff00]">innovators</span>.
              </h2>
              <p className="text-lg opacity-70 mb-8 max-w-md">
                Join a community where technical excellence meets creative problem solving. Your journey into the future starts here.
              </p>

              <div className="flex flex-wrap gap-4">
                <HomeButton isAdmissionOpen={isAdmissionOpen} isLoading={isLoading} />
                <button
                  onClick={() => window.open("https://www.cectl.ac.in/", "_blank")}
                  className="px-8 py-4 rounded-full border border-black/10 hover:bg-white transition-colors font-medium">
                  Official Site
                </button>
              </div>
            </div>

          </BentoCard>

          {/* 2. Visual / Stats Card (Tall) */}
          <BentoCard dark className="md:col-span-3 lg:col-span-4 flex flex-col justify-between" delay={0.2}>
            <div>
              <MicroLabel className="text-[#ccff00]">Rankings</MicroLabel>
              <div className="text-[8rem] font-serif leading-none tracking-tighter text-[#ccff00]">
                {admissionStats.collegeRank}
              </div>
              <p className="text-xl opacity-80 mt-2">{admissionStats.rankDescription}</p>
            </div>

            <div className="space-y-4 pt-12">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-mono opacity-60">PLACEMENTS</span>
                  <FaBolt className="text-[#ccff00]" />
                </div>
                <div className="text-3xl font-medium">{admissionStats.placementPercentage}</div>
              </div>
            </div>
          </BentoCard>

          {/* 3. Bottom Row Cards (Grid items) */}
          <BentoCard
            className={`md:col-span-3 lg:col-span-4 ${isAdmissionOpen ? "bg-[#ccff00] text-black" : "bg-[#e5e5e5] text-black/60"}`}
            delay={0.3}
          >
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="font-serif text-5xl mb-2">{currentYear}</div>
              <div className="font-mono text-sm uppercase tracking-widest border-t border-current pt-2 w-3/4 mx-auto leading-relaxed">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 animate-pulse">
                    <span className="w-2 h-2 bg-current rounded-full" />
                    <span>CHECKING STATUS...</span>
                  </div>
                ) : (
                  isAdmissionOpen ? "Applications Live" : "Admissions are taking a short nap. Check back soon!"
                )}
              </div>
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-3 lg:col-span-4 bg-[#e6e2d6] group cursor-pointer" delay={0.4}>
            <div onClick={() => window.location.href = '/track-status'} className="h-full flex flex-col justify-between cursor-pointer">
              <div className="flex justify-between items-start">
                <MicroLabel>Application Status</MicroLabel>
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <FaArrowRight />
                </div>
              </div>
              <div className="text-2xl font-medium">
                Track your admission application status.
              </div>
            </div>
          </BentoCard>

          <BentoCard dark className="md:col-span-3 lg:col-span-4 relative overflow-hidden" delay={0.5}>
            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-br from-blue-500 to-purple-500" />
            <div className="relative z-10 h-full flex flex-col justify-end">
              <MicroLabel className="text-white">Innovation Hub</MicroLabel>
              <p className="text-lg leading-relaxed text-white/80">
                Where ideas turn into reality. Incubation center & startup valley.
              </p>
            </div>
          </BentoCard>

        </div>
      </div>
    </div>
  );
};

export default Home;
