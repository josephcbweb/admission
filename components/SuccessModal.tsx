import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiDownload,
  FiX,
  FiSearch,
  FiUser,
  FiBook,
  FiHash,
} from "react-icons/fi";

interface SuccessModalProps {
  isOpen: boolean;
  studentName: string;
  admissionNumber: string;
  program: string;
  onClose: () => void;
  onDownload: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  studentName,
  admissionNumber,
  program,
  onClose,
  onDownload,
}) => {
  const getProgramFullName = (prog: string) => {
    const programs: { [key: string]: string } = {
      btech: "Bachelor of Technology",
      mca: "Master of Computer Applications",
      mtech: "Master of Technology",
    };
    return programs[prog.toLowerCase()] || prog;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-100"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-10 text-gray-900"
                aria-label="Close"
              >
                <FiX size={24} />
              </button>

              {/* Header Section */}
              <div className="relative px-8 pt-12 pb-8 border-b border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 bg-[#ccff00] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.3)]">
                      <FiCheckCircle className="text-black" size={44} />
                    </div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-serif text-gray-900 mb-3"
                  >
                    Application Successfully Submitted
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-500 max-w-md font-sans"
                  >
                    Your admission application has been received. Please save
                    your admission number for future reference.
                  </motion.p>
                </div>
              </div>

              {/* Content Section */}
              <div className="px-8 py-8">
                {/* Information Cards - Horizontal Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {/* Student Name */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-gray-200 transition-colors shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FiUser className="text-[#ccff00]" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">
                          Student Name
                        </p>
                        <p className="text-lg font-serif text-gray-900 truncate">
                          {studentName}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Program */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-gray-200 transition-colors shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FiBook className="text-[#ccff00]" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1">
                          Program
                        </p>
                        <p className="text-lg font-serif text-gray-900">
                          {program.toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate font-sans">
                          {getProgramFullName(program)}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Admission Number - Full Width */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="md:col-span-2 bg-black rounded-2xl p-6 shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <FiHash size={120} className="text-white transform rotate-12 translate-x-4 -translate-y-4" />
                    </div>
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-14 h-14 bg-[#ccff00] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(204,255,0,0.2)]">
                        <FiHash className="text-black" size={28} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest mb-2">
                          Your Admission Number
                        </p>
                        <div className="inline-block bg-white/10 backdrop-blur-md rounded-xl px-6 py-2 border border-white/10">
                          <p className="text-3xl font-mono font-bold text-[#ccff00] tracking-wider">
                            {admissionNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Important Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-[#ccff00]">
                        <span className="text-xs font-bold">!</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-serif text-gray-900 mb-3 text-lg">
                        Next Steps
                      </p>
                      <ul className="text-sm text-gray-600 space-y-2 font-sans">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>
                            Download and save your application form for your records.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>
                            Keep your admission number safe for tracking your application.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>
                            Check your email for confirmation and further instructions.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <button
                    onClick={onDownload}
                    data-download-button
                    className="flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#bbe600] text-black px-6 py-4 rounded-full font-bold transition-all duration-300 shadow-[0_4px_14px_0_rgba(204,255,0,0.39)] hover:shadow-[0_6px_20px_rgba(204,255,0,0.23)] cursor-pointer"
                  >
                    <FiDownload size={20} />
                    <span>Download</span>
                  </button>

                  <a
                    href="/status"
                    className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-6 py-4 rounded-full font-medium transition-all duration-200 border-2 border-gray-200 hover:border-black/20 cursor-pointer"
                  >
                    <FiSearch size={20} />
                    <span>Track Status</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="flex items-center justify-center px-6 py-4 bg-transparent hover:bg-gray-100 text-gray-600 rounded-full font-medium transition-all duration-200 border border-transparent cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>

                {/* Footer */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-xs text-gray-400 mt-8 pt-6 border-t border-gray-100 font-mono uppercase tracking-wider"
                >
                  For queries, contact{" "}
                  <a
                    href="mailto:admissions@cec.ac.in"
                    className="text-gray-900 hover:underline cursor-pointer"
                  >
                    admissions@cec.ac.in
                  </a>
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
