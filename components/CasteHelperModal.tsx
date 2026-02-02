import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiSearch, FiInfo } from "react-icons/fi";

interface CasteHelperModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CasteHelperModal: React.FC<CasteHelperModalProps> = ({ isOpen, onClose }) => {
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
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100 flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-[#ccff00]">
                                        <FiSearch size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-serif text-gray-900">
                                            Find Your Category
                                        </h2>
                                        <p className="text-xs text-gray-500 font-mono uppercase tracking-wide">
                                            SC, ST, OBC, or General
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900 cursor-pointer"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-8">
                                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-sm text-blue-800">
                                    <FiInfo className="flex-shrink-0 mt-0.5" size={16} />
                                    <p>
                                        Official caste lists are maintained by the Central and State Governments.
                                        Use the links below to check your specific community status.
                                    </p>
                                </div>

                                {/* Categories Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* OBC */}
                                    <div className="p-5 rounded-2xl border-2 border-gray-100 hover:border-black/5 transition-colors bg-white">
                                        <h3 className="font-bold text-gray-900 mb-2">OBC (Other Backward Classes)</h3>
                                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                            Socially and educationally backward classes.
                                            You must also check if you fall under the "Creamy Layer" (income basis).
                                        </p>
                                        <a
                                            href="http://www.ncbc.nic.in/User_Panel/CentralListStateView.aspx"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-bold text-black border-b border-black/20 hover:border-black pb-0.5"
                                        >
                                            Check Central OBC List <FiExternalLink />
                                        </a>
                                    </div>

                                    {/* SC */}
                                    <div className="p-5 rounded-2xl border-2 border-gray-100 hover:border-black/5 transition-colors bg-white">
                                        <h3 className="font-bold text-gray-900 mb-2">SC (Scheduled Castes)</h3>
                                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                            Communities historically designated as standard castes.
                                            Specific to state lists.
                                        </p>
                                        <a
                                            href="http://socialjustice.gov.in/common/76750"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-bold text-black border-b border-black/20 hover:border-black pb-0.5"
                                        >
                                            Check SC Lists <FiExternalLink />
                                        </a>
                                    </div>

                                    {/* ST */}
                                    <div className="p-5 rounded-2xl border-2 border-gray-100 hover:border-black/5 transition-colors bg-white">
                                        <h3 className="font-bold text-gray-900 mb-2">ST (Scheduled Tribes)</h3>
                                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                            Indigenous tribal communities listed in the Constitution (Scheduled Tribes) Order.
                                        </p>
                                        <a
                                            href="https://tribal.nic.in/ST/LatestListofScheduledtribes.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-bold text-black border-b border-black/20 hover:border-black pb-0.5"
                                        >
                                            Check ST Lists <FiExternalLink />
                                        </a>
                                    </div>

                                    {/* General */}
                                    <div className="p-5 rounded-2xl border-2 border-gray-100 hover:border-black/5 transition-colors bg-white">
                                        <h3 className="font-bold text-gray-900 mb-2">General / Unreserved</h3>
                                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                            Communities not listed in SC, ST, or OBC lists.
                                            Also includes EWS (Economically Weaker Sections) if eligible.
                                        </p>
                                        <span className="text-xs text-gray-400">
                                            No specific list (Default category)
                                        </span>
                                    </div>
                                </div>

                                {/* Important Note */}
                                <div className="text-center border-t border-gray-100 pt-6">
                                    <p className="text-xs text-gray-400">
                                        Note: Admission category claims must be supported by valid certificates
                                        issued by a competent authority (Tehsildar/Revenue Officer).
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CasteHelperModal;
