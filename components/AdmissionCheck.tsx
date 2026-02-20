"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";
import { FaRankingStar } from "react-icons/fa6";

interface AdmissionStatus {
  open: boolean;
  deadline: string;
  openDate?: string;
}

interface AdmissionCheckProps {
  onAdmissionsReady: (openPrograms: string[]) => void;
  onProgramSelect: (program: string) => void;
}

const AdmissionCheck: React.FC<AdmissionCheckProps> = ({
  onAdmissionsReady,
  onProgramSelect,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [admissionData, setAdmissionData] = useState<{
    [key: string]: AdmissionStatus;
  } | null>(null);

  useEffect(() => {
    const checkAdmissionStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/admission/status");
        if (!response.ok) throw new Error("Failed to fetch status");

        const data = await response.json();
        const admissions = data.admissionsOpen || data.data?.admissionsOpen || {};
        setAdmissionData(admissions);

        const openPrograms = Object.keys(admissions).filter(
          (program) => admissions[program]?.open === true
        );
        onAdmissionsReady(openPrograms);
      } catch (err) {
        console.error(err);
        setError("Unable to load admission data.");
      } finally {
        setLoading(false);
      }
    };
    checkAdmissionStatus();
  }, [onAdmissionsReady]);

  // --- Logic ---
  const now = new Date();
  const ongoing: [string, AdmissionStatus][] = [];
  const upcoming: [string, AdmissionStatus][] = [];
  const closed: [string, AdmissionStatus][] = [];

  if (admissionData) {
    Object.entries(admissionData).forEach(([key, status]) => {
      if (status.open) {
        ongoing.push([key, status]);
      } else {
        const deadlineDate = new Date(status.deadline);
        const openDate = status.openDate ? new Date(status.openDate) : null;

        // If there is a future open date, it is upcoming
        if (openDate && openDate > now) {
          upcoming.push([key, status]);
        }
        // If no open date, but deadline is in the future, it is upcoming (implies starts soon)
        else if (deadlineDate > now) {
          upcoming.push([key, status]);
        }
        // Otherwise it is truly closed
        else {
          closed.push([key, status]);
        }
      }
    });
  }

  // --- Animations ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15
      } as any
    },
  };

  const loaderVariants = {
    start: { transition: { staggerChildren: 0.2 } },
    end: { transition: { staggerChildren: 0.2 } },
  };

  const dotVariants = {
    start: { y: "0%" },
    end: { y: "100%" },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  };

  const getInfo = (key: string) => {
    const map: Record<string, { title: string; sub: string }> = {
      BTECH: { title: "B.Tech", sub: "Bachelor of Technology" },
      MCA: { title: "MCA", sub: "Master of Computer Applications" },
      MTECH: { title: "M.Tech", sub: "Master of Technology" },
    };
    return map[key.toUpperCase()] || { title: key, sub: "Program" };
  };

  const formatDate = (s: string) => new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const Section = ({ title, items, type }: { title: string, items: [string, AdmissionStatus][], type: 'ongoing' | 'upcoming' | 'closed' }) => {
    if (items.length === 0) return null;
    return (
      <motion.div variants={itemVariants} className="mb-16">
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-6 text-[#1a1917]/40 flex items-center gap-2">
          {type === 'ongoing' && <span className="h-2 w-2 rounded-full bg-[#ccff00] shadow-[0_0_10px_#ccff00] animate-pulse" />}
          {title}
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {items.map(([key, status]) => {
            const info = getInfo(key);
            return (
              <motion.div
                key={key}
                variants={itemVariants}
                whileHover={type === 'ongoing' ? { y: -4, transition: { duration: 0.2 } } : {}}
                onClick={() => type === 'ongoing' && onProgramSelect(key)}
                className={`
                  relative p-6 group rounded-[2rem] border
                  transition-all duration-300 overflow-hidden
                  ${type === 'ongoing'
                    ? 'cursor-pointer bg-[#efede6] border-black/5 hover:border-[#ccff00]/50 hover:shadow-xl'
                    : 'bg-[#f5f5f0] border-transparent opacity-60 grayscale'}
                  ${type === 'upcoming' ? 'border-dashed border-black/10' : ''}
                `}
              >
                {type === 'ongoing' && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#ccff00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                )}

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <h4 className="text-3xl font-serif text-[#1a1917] tracking-tight">{info.title}</h4>
                    <p className="text-[10px] text-[#1a1917]/60 mt-2 font-mono uppercase tracking-widest">{info.sub}</p>
                  </div>
                </div>

                <div className={`space-y-4 mt-12 relative z-10 ${type === 'ongoing' ? 'group-hover:opacity-0 transition-opacity duration-300' : ''}`}>
                  {type === 'upcoming' && !status.openDate && (
                    <div className="text-sm font-mono opacity-50 italic">Opening details TBA</div>
                  )}

                  {(type !== 'upcoming' || status.openDate) && (
                    <div className="flex items-center justify-between text-xs font-mono text-[#1a1917]/70">
                      <span className="uppercase tracking-wider">{type === 'upcoming' ? 'Opens' : 'Deadline'}</span>
                      <span className="font-bold">{type === 'upcoming' && status.openDate ? formatDate(status.openDate) : formatDate(status.deadline)}</span>
                    </div>
                  )}
                </div>

                {type === 'ongoing' && (
                  <div className="absolute bottom-6 right-6 overflow-hidden z-10">
                    <div className="w-10 h-10 rounded-full bg-[#ccff00] flex items-center justify-center transform translate-y-20 group-hover:translate-y-0 transition-transform duration-300">
                      <FiArrowRight className="text-black text-lg" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#fbfbf6] text-[#1a1917] font-sans selection:bg-[#ccff00] selection:text-black flex relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilterAdmission">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterAdmission)" />
        </svg>
      </div>

      {/* LEFT SIDE - Scrollable Content */}
      <div className="w-full lg:w-1/2 px-6 py-12 md:p-20 overflow-y-auto flex flex-col min-h-screen relative z-10">

        {loading ? (
          <div className="flex-1 flex flex-col justify-center items-center space-y-8">
            <motion.div
              className="flex space-x-3"
              variants={loaderVariants}
              initial="start"
              animate="end"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-[#ccff00] rounded-full"
                  variants={dotVariants}
                  transition={dotTransition as any}
                />
              ))}
            </motion.div>
            <p className="font-mono text-[10px] tracking-widest uppercase opacity-40">Loading Portal...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex justify-center items-center text-red-500 font-mono text-sm">{error}</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <motion.header variants={itemVariants} className="mb-20 space-y-6 border-b border-black/5 pb-12">
              <div className="inline-block mb-4">
                <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-black/10 rounded-full bg-white/50">
                  Academic Year 2025-26
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-[#1a1917] leading-[0.85]">
                Apply <br />
                <span className="font-light italic opacity-50">Now.</span>
              </h1>
            </motion.header>

            <div className="space-y-12">
              <Section title="Open Applications" items={ongoing} type="ongoing" />
              <Section title="Approaching" items={upcoming} type="upcoming" />
              <Section title="Archived" items={closed} type="closed" />

              {ongoing.length === 0 && upcoming.length === 0 && closed.length === 0 && (
                <motion.div variants={itemVariants} className="py-20 text-center border border-dashed border-black/10 rounded-[2rem]">
                  <p className="opacity-40 font-mono text-sm">No active admission cycles.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* RIGHT SIDE - Fixed Visuals */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden border-l border-black/5 bg-[#f5f5f0]">
        {/* Animated Background Blobs - Earth/Neon Theme */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ccff00]/20 rounded-full blur-3xl mix-blend-multiply"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl mix-blend-multiply"
        />

        {/* Decorative Card Stack - Bento Style */}
        <div className="relative z-10 w-96">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute inset-0 bg-[#efede6] border border-black/5 shadow-sm rounded-[2.5rem] h-64 w-full"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 6 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute inset-0 bg-[#fbfbf6] border border-black/5 shadow-md rounded-[2.5rem] h-64 w-full"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative bg-[#fbfbf6]/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-[2.5rem] p-10 h-96 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#ccff00] flex items-center justify-center text-black text-2xl shadow-lg shadow-[#ccff00]/20">
                <FaRankingStar />
              </div>
              <div>
                <h3 className="text-3xl font-serif text-[#1a1917] leading-none mb-3">Begin Journey</h3>
                <p className="text-[#1a1917]/60 font-sans text-sm leading-relaxed">
                  "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-8 border-t border-black/5">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-[#e6e2d6] border-2 border-[#fbfbf6]" />
                ))}
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest opacity-40">Join Today</div>
                <div className="font-bold text-sm">1000+ Students</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionCheck;
