"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaArrowRight, FaCheckCircle, FaTimesCircle, FaClock, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

const TrackStatus = () => {
    const [admissionNumber, setAdmissionNumber] = useState("");
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!admissionNumber.trim()) return;

        setLoading(true);
        setError("");
        setStatus(null);

        try {
            const response = await fetch(`/api/check/${admissionNumber}`);
            const data = await response.json();

            if (data.success) {
                setStatus(data.data);
            } else {
                setError(data.error || "Application not found.");
            }
        } catch (err) {
            setError("Failed to fetch status. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "approved": return "text-green-600 bg-green-50 border-green-200";
            case "rejected": return "text-red-600 bg-red-50 border-red-200";
            case "pending": return "text-yellow-600 bg-yellow-50 border-yellow-200";
            default: return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case "approved": return <FaCheckCircle className="text-2xl" />;
            case "rejected": return <FaTimesCircle className="text-2xl" />;
            case "pending": return <FaClock className="text-2xl" />;
            default: return <FaSearch className="text-2xl" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#fbfbf6] text-[#1a1917] font-sans selection:bg-[#ccff00] selection:text-black flex flex-col">
            {/* Navbar / Back Button */}
            <nav className="p-6 md:p-8 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
                    <FiChevronLeft /> Back to Home
                </Link>
            </nav>

            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-2xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full text-center space-y-6 mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/20 border border-[#ccff00]/50 text-[#5a7000] text-[10px] font-mono uppercase tracking-widest font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        Live Status
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif leading-tight">
                        Track your <br />
                        <span className="italic opacity-50">Application.</span>
                    </h1>
                    <p className="text-lg opacity-60 max-w-md mx-auto">
                        Enter your admission number below to check the current status of your application.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSearch}
                    className="w-full relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50" />

                    <div className="relative bg-white p-2 rounded-2xl border border-black/5 shadow-xl shadow-black/5 flex items-center gap-2 transition-all group-focus-within:border-black/20 group-focus-within:shadow-2xl group-focus-within:shadow-black/10">
                        <div className="pl-4 text-gray-400">
                            <FaSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Admission Number (e.g., BTECH-2025-001)"
                            className="flex-1 bg-transparent border-none outline-none h-14 text-lg font-medium placeholder:text-gray-300 w-full min-w-0"
                            value={admissionNumber}
                            onChange={(e) => setAdmissionNumber(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#1a1917] text-white h-12 px-6 rounded-xl font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : <>Track <FaArrowRight className="text-xs" /></>}
                        </button>
                    </div>
                </motion.form>

                <div className="w-full mt-12 min-h-[200px]">
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-6 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        {status && (
                            <motion.div
                                key="status"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white rounded-3xl p-8 border border-black/5 shadow-2xl shadow-black/5 overflow-hidden relative"
                            >
                                <div className={`absolute top-0 left-0 w-full h-1.5 ${status.status === 'approved' ? 'bg-green-500' : status.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`} />

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-black/5 pb-8">
                                    <div>
                                        <div className="text-sm opacity-50 font-mono uppercase tracking-wider mb-1">Applicant</div>
                                        <div className="text-2xl font-serif font-bold">{status.name}</div>
                                    </div>
                                    <div className={`flex items-center gap-3 px-4 py-2 rounded-full border ${getStatusColor(status.status)}`}>
                                        {getStatusIcon(status.status)}
                                        <span className="font-bold uppercase tracking-wide text-sm">{status.status}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 rounded-xl bg-gray-50 border border-black/5">
                                        <div className="text-xs font-mono uppercase opacity-50 mb-1">Program</div>
                                        <div className="font-medium">{status.program?.toUpperCase()}</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-black/5">
                                        <div className="text-xs font-mono uppercase opacity-50 mb-1">Department</div>
                                        <div className="font-medium">{status.allotted_branch || "Not Assigned"}</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-black/5">
                                        <div className="text-xs font-mono uppercase opacity-50 mb-1">Admission Type</div>
                                        <div className="font-medium capitalize">{status.admission_type}</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-black/5">
                                        <div className="text-xs font-mono uppercase opacity-50 mb-1">Applied Date</div>
                                        <div className="font-medium">{new Date(status.createdAt).toLocaleDateString()}</div>
                                    </div>
                                </div>

                                {status.status === 'approved' && (
                                    <div className="mt-8 pt-8 border-t border-black/5 flex justify-center">
                                        <p className="text-center text-sm opacity-60">
                                            Congratulations! Your application has been approved. Please check your email for further instructions.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TrackStatus;
