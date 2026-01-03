import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiCheckCircle, FiDownload, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

interface SuccessModalProps {
  isOpen: boolean;
  studentName: string;
  admissionNumber: string;
  program: string;
  onClose: () => void;
  onDownload?: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  studentName,
  admissionNumber,
  program,
  onClose,
  onDownload,
}) => {
  const getProgramName = (prog: string) => {
    switch (prog) {
      case "btech":
        return "B.Tech (Bachelor of Technology)";
      case "mca":
        return "MCA (Master of Computer Applications)";
      case "mtech":
        return "M.Tech (Master of Technology)";
      default:
        return prog;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              {/* Success Header */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-block"
                >
                  <div className="bg-green-100 rounded-full p-4 inline-flex items-center justify-center">
                    <FiCheckCircle size={48} className="text-green-600" />
                  </div>
                </motion.div>

                <motion.h2
                  className="text-2xl font-bold text-gray-900 mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Application Submitted!
                </motion.h2>

                <motion.p
                  className="text-gray-600 mt-2 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Your admission form has been successfully submitted.
                </motion.p>
              </div>

              {/* Content */}
              <motion.div
                className="px-6 py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Admission Details */}
                <div className="space-y-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Admission Number
                    </p>
                    <p className="text-xl font-bold text-primaryAccent break-all">
                      {admissionNumber}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      Please save this number. You'll need it for future
                      correspondence.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Applicant Name
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {studentName}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Program Applied For
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {getProgramName(program)}
                    </p>
                  </div>
                </div>

                {/* Status Message */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-xs font-semibold text-yellow-900 mb-2">
                    📋 What's Next?
                  </p>
                  <ul className="text-sm text-yellow-900 space-y-2">
                    <li className="flex gap-2">
                      <span className="font-bold flex-shrink-0">1.</span>
                      <span>
                        A confirmation email has been sent to your registered
                        email address.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold flex-shrink-0">2.</span>
                      <span>Your application is currently under review.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold flex-shrink-0">3.</span>
                      <span>
                        We'll notify you of the decision via email and SMS.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Important Note */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-xs font-semibold text-blue-900 mb-2">
                    📌 Important Notes:
                  </p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>
                      • Keep your admission number safe for future reference
                    </li>
                    <li>
                      • Check spam folder if you don't receive confirmation
                      email
                    </li>
                    <li>• Processing typically takes 5-7 working days</li>
                  </ul>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col gap-3 sm:flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={onDownload}
                  className="flex-1 px-4 py-2 bg-primaryAccent text-white rounded-lg font-medium hover:bg-primaryAccentDark transition-colors flex items-center justify-center gap-2"
                >
                  <FiDownload size={18} />
                  Download Form
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </motion.div>

              {/* Footer Link */}
              <motion.div
                className="px-6 py-3 border-t border-gray-200 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Link
                  href={`/admission/check/${admissionNumber}`}
                  className="text-sm text-primaryAccent hover:text-primaryAccentDark font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  Check Application Status <FiArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
