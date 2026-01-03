"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";

interface AdmissionStatus {
  open: boolean;
  deadline: string;
  openDate?: string;
  description: string;
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

        if (!response.ok) {
          throw new Error("Failed to fetch admission status");
        }

        const data = await response.json();

        // Handle both response formats
        const admissions =
          data.admissionsOpen || data.data?.admissionsOpen || {};

        setAdmissionData(admissions);

        // Get list of open programs
        const openPrograms = Object.keys(admissions).filter(
          (program) => admissions[program]?.open === true
        );

        onAdmissionsReady(openPrograms);
      } catch (err) {
        console.error("Error checking admission status:", err);
        setError(
          "Unable to load admission information. Please check your connection and try again."
        );
        onAdmissionsReady([]);
      } finally {
        setLoading(false);
      }
    };

    checkAdmissionStatus();
  }, [onAdmissionsReady]);

  if (loading) {
    return (
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Modern Loading Animation */}
          <div className="relative w-20 h-20">
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 border-4 border-blue-200 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner Ring */}
            <motion.div
              className="absolute inset-2 border-4 border-transparent border-t-blue-600 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Center Dot */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            </motion.div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Loading Admission Status
            </h3>
            <p className="text-gray-600 text-sm">
              Please wait while we check available programs...
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border-2 border-red-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <FiAlertCircle className="text-red-600" size={32} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Connection Error
            </h3>
            <p className="text-gray-600 mb-6 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!admissionData || Object.keys(admissionData).length === 0) {
    return (
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <FiClock className="text-yellow-600" size={32} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No Admission Information Available
            </h3>
            <p className="text-gray-600 text-sm">
              Admission details are not currently available. Please check back
              later.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Check if any admissions are open
  const hasOpenAdmissions = Object.values(admissionData).some(
    (program) => program.open === true
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Get program display info
  const getProgramInfo = (programKey: string) => {
    const programMap: Record<
      string,
      { name: string; fullName: string; description: string; gradient: string }
    > = {
      btech: {
        name: "B.Tech",
        fullName: "Bachelor of Technology",
        description: "4-year undergraduate program",
        gradient: "from-blue-500 to-indigo-600",
      },
      mca: {
        name: "MCA",
        fullName: "Master of Computer Applications",
        description: "2-year postgraduate program",
        gradient: "from-purple-500 to-pink-600",
      },
      mtech: {
        name: "M.Tech",
        fullName: "Master of Technology",
        description: "2-year postgraduate program",
        gradient: "from-green-500 to-teal-600",
      },
    };
    return (
      programMap[programKey.toLowerCase()] || {
        name: programKey,
        fullName: programKey,
        description: "",
        gradient: "from-gray-500 to-gray-700",
      }
    );
  };

  // Get open and closed programs
  const openPrograms = Object.entries(admissionData).filter(
    ([_, status]) => status.open === true
  );
  const closedPrograms = Object.entries(admissionData).filter(
    ([_, status]) => status.open === false
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Open Admissions Section */}
      {hasOpenAdmissions && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-green-50 px-6 py-3 rounded-full mb-4">
              <FiCheckCircle className="text-green-600" size={24} />
              <span className="text-green-900 font-semibold">
                Admissions Open
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Apply Now
            </h2>
            <p className="text-gray-600 text-sm">
              Select your program to begin the application process
            </p>
          </div>

          {/* Open Programs Grid */}
          <div
            className={`grid gap-4 ${
              openPrograms.length === 1
                ? "max-w-sm mx-auto"
                : openPrograms.length === 2
                ? "max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            <AnimatePresence>
              {openPrograms.map(([programKey, status], index) => {
                const programInfo = getProgramInfo(programKey);

                return (
                  <motion.button
                    key={programKey}
                    onClick={() => onProgramSelect(programKey)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl p-6 text-left transition-all duration-200 border border-gray-200 hover:border-transparent group cursor-pointer"
                  >
                    {/* Gradient Bar */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${programInfo.gradient}`}
                    ></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        <FiCheckCircle size={12} />
                        <span>Open</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 mt-2">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {programInfo.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {programInfo.fullName}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        {programInfo.description}
                      </p>

                      {/* Deadline */}
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-4 bg-gray-50 px-3 py-2 rounded-lg">
                        <FiClock size={14} />
                        <span>
                          Deadline:{" "}
                          <strong>{formatDate(status.deadline)}</strong>
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium group-hover:gap-3 transition-all">
                        Apply Now
                        <FiArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform duration-200"
                        />
                      </div>
                    </div>

                    {/* Background Gradient on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${programInfo.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-200`}
                    ></div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Closed Admissions Section */}
      {closedPrograms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: hasOpenAdmissions ? 0.2 : 0, duration: 0.3 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {hasOpenAdmissions
                ? "Currently Closed"
                : "Admissions Currently Closed"}
            </h3>
            <p className="text-sm text-gray-500">
              {hasOpenAdmissions
                ? "These programs are not accepting applications at this time"
                : "No programs are currently accepting applications"}
            </p>
          </div>

          <div
            className={`grid gap-4 ${
              closedPrograms.length === 1
                ? "max-w-sm mx-auto"
                : closedPrograms.length === 2
                ? "max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {closedPrograms.map(([programKey, status], index) => {
              const programInfo = getProgramInfo(programKey);

              return (
                <motion.div
                  key={programKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay:
                      (hasOpenAdmissions ? openPrograms.length : 0) * 0.08 +
                      index * 0.08,
                    duration: 0.3,
                  }}
                  className="relative overflow-hidden bg-white rounded-xl shadow-sm p-6 text-left border-2 border-gray-200 opacity-75"
                >
                  {/* Gradient Bar (muted) */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${programInfo.gradient} opacity-30`}
                  ></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      <FiXCircle size={12} />
                      <span>Closed</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {programInfo.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {programInfo.fullName}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      {programInfo.description}
                    </p>

                    {/* Date Info */}
                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      <FiClock size={14} />
                      <span>
                        {status.openDate ? (
                          <>
                            Opens on:{" "}
                            <strong>{formatDate(status.openDate)}</strong>
                          </>
                        ) : (
                          <>
                            Closed until:{" "}
                            <strong>{formatDate(status.deadline)}</strong>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Info for Closed Admissions */}
          {!hasOpenAdmissions && (
            <motion.div
              className="bg-orange-50 border border-orange-200 rounded-xl p-6 mt-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <FiAlertCircle
                  className="text-orange-600 flex-shrink-0 mt-1"
                  size={20}
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    Need More Information?
                  </h4>
                  <p className="text-gray-700 text-sm mb-4">
                    For admission inquiries and updates, please contact our
                    admissions office.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <a
                      href="mailto:admissions@cec.ac.in"
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      📧 admissions@cec.ac.in
                    </a>
                    <a
                      href="tel:+914782812345"
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      📞 +91 478 281 2345
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AdmissionCheck;
