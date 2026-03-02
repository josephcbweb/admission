import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiAlertCircle,
    FiX,
    FiArrowRight,
    FiUser,
    FiBook,
    FiShield,
} from "react-icons/fi";

interface ConfirmSubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isSubmitting: boolean;
    studentName: string;
    program: string;
}

const ConfirmSubmissionModal: React.FC<ConfirmSubmissionModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    isSubmitting,
    studentName,
    program,
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
                        onClick={!isSubmitting ? onClose : undefined}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100 relative"
                        >
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                                <FiShield size={200} className="transform rotate-12 translate-x-8 -translate-y-8" />
                            </div>

                            {/* Close Button */}
                            {!isSubmitting && (
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-10 text-gray-900"
                                    aria-label="Close"
                                >
                                    <FiX size={24} />
                                </button>
                            )}

                            <div className="p-8 md:p-10 relative z-10">
                                {/* Icon & Title */}
                                <div className="flex flex-col items-center text-center mb-10">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                                        className="w-16 h-16 bg-[#2563eb] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(37,99,235,0.3)]"
                                    >
                                        <FiAlertCircle className="text-white" size={32} />
                                    </motion.div>
                                    <h2 className="text-3xl font-serif text-gray-900 mb-2">
                                        Confirm Submission
                                    </h2>
                                    <p className="text-gray-500 font-sans text-sm max-w-sm">
                                        Please review your details one last time. Once submitted, your application will be processed by our admissions team.
                                    </p>
                                </div>

                                {/* Summary Box */}
                                <div className="space-y-4 mb-10">
                                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                        <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-200/50">
                                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <FiUser className="text-[#2563eb]" size={16} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                                                    Applicant Name
                                                </p>
                                                <p className="text-base font-serif text-gray-900 truncate">
                                                    {studentName}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <FiBook className="text-[#2563eb]" size={16} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                                                    Program Selection
                                                </p>
                                                <p className="text-base font-serif text-gray-900">
                                                    {program.toUpperCase()}
                                                </p>
                                                <p className="text-[10px] text-gray-500 font-sans">
                                                    {getProgramFullName(program)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 px-4">
                                        <div className="mt-1 flex-shrink-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></div>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed italic">
                                            By confirming, you certify that all information provided is true and correct to the best of your knowledge.
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={onClose}
                                        disabled={isSubmitting}
                                        className="px-6 py-4 rounded-full border-2 border-gray-100 text-gray-600 font-medium text-sm hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                                    >
                                        Go Back
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        disabled={isSubmitting}
                                        className="px-6 py-4 rounded-full bg-[#2563eb] text-white font-bold text-sm hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                                                />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Confirm & Submit</span>
                                                <FiArrowRight size={16} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Footer Progress Line */}
                            {isSubmitting && (
                                <motion.div
                                    className="absolute bottom-0 left-0 h-1 bg-[#2563eb]"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ConfirmSubmissionModal;
