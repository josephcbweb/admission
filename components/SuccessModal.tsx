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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-10"
                aria-label="Close"
              >
                <FiX size={24} className="text-gray-600" />
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
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <FiCheckCircle className="text-white" size={44} />
                    </div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-semibold text-gray-900 mb-2"
                  >
                    Application Submitted Successfully
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 max-w-md"
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
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiUser className="text-white" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Student Name
                        </p>
                        <p className="text-lg font-semibold text-gray-900 truncate">
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
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiBook className="text-white" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Program
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {program.toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5 truncate">
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
                    className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiHash className="text-gray-900" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                          Your Admission Number
                        </p>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                          <p className="text-2xl font-bold text-white tracking-wider font-mono">
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
                  className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">!</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-amber-900 mb-2">
                        Next Steps
                      </p>
                      <ul className="text-sm text-amber-800 space-y-1.5">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 mt-0.5">•</span>
                          <span>
                            Download and save your application form for your
                            records
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 mt-0.5">•</span>
                          <span>
                            Keep your admission number safe for tracking your
                            application
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 mt-0.5">•</span>
                          <span>
                            Check your email for confirmation and further
                            instructions
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600 mt-0.5">•</span>
                          <span>
                            You can track your application status anytime using
                            your admission number
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
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  <button
                    onClick={onDownload}
                    data-download-button
                    className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <FiDownload size={20} />
                    <span>Download Form</span>
                  </button>

                  <a
                    href="/status"
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-4 rounded-xl font-semibold transition-all duration-200 border border-gray-300 cursor-pointer"
                  >
                    <FiSearch size={20} />
                    <span>Track Status</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="flex items-center justify-center px-6 py-4 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition-all duration-200 border border-gray-300 cursor-pointer"
                  >
                    Close
                  </button>
                </motion.div>

                {/* Footer */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-xs text-gray-500 mt-6 pt-6 border-t border-gray-100"
                >
                  For queries, contact{" "}
                  <a
                    href="mailto:admissions@cec.ac.in"
                    className="text-gray-700 hover:text-gray-900 font-medium underline cursor-pointer"
                  >
                    admissions@cec.ac.in
                  </a>{" "}
                  or call{" "}
                  <a
                    href="tel:+914782812345"
                    className="text-gray-700 hover:text-gray-900 font-medium underline cursor-pointer"
                  >
                    +91 478 281 2345
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
